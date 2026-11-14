import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { isValidEmail, isValidPhone } from '@/lib/validation';
import { Field, inputClass } from '@/components/ui/FormField';
import { SubmitButton } from '@/components/ui/Button';

type Values = {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  monthlyRequirement: string;
  district: string;
  state: string;
  country: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: '',
  phone: '',
  email: '',
  businessName: '',
  monthlyRequirement: '',
  district: '',
  state: '',
  country: 'India',
  message: '',
  consent: false,
};

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!isValidPhone(values.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!isValidEmail(values.email)) errors.email = 'Please enter a valid email address.';
  if (!values.monthlyRequirement.trim()) errors.monthlyRequirement = 'Please enter your approximate monthly requirement.';
  if (!values.district.trim()) errors.district = 'Please enter your district.';
  if (!values.state.trim()) errors.state = 'Please enter your state.';
  if (!values.country.trim()) errors.country = 'Please enter your country.';
  if (values.message.length > 2000) errors.message = 'Please keep your message under 2000 characters.';
  if (!values.consent) errors.consent = 'Please agree to be contacted about your application.';
  return errors;
}

export function DealerForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const set = <K extends keyof Values>(key: K, value: Values[K]) => setValues((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    const { error } = await supabase.from('dealer_applications').insert({
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      business_name: values.businessName.trim() || null,
      monthly_requirement: values.monthlyRequirement.trim(),
      district: values.district.trim(),
      state: values.state.trim(),
      country: values.country.trim(),
      message: values.message.trim() || null,
      consent: values.consent,
    });

    if (error) {
      setStatus('error');
      return;
    }
    setValues(EMPTY);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-3xl bg-green-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-navy-900">Application received</h2>
        <p className="max-w-md text-slate-600">Our dealer team will review your application and contact you on the details you shared.</p>
        <button type="button" onClick={() => setStatus('idle')} className="text-sm font-semibold text-navy-900 underline underline-offset-4">
          Submit another application
        </button>
      </div>
    );
  }

  const field = (key: keyof Values) => ({
    id: `dealer-${key}`,
    value: values[key] as string,
    onChange: (event: { target: { value: string } }) => set(key, event.target.value as Values[typeof key]),
    'aria-invalid': !!errors[key],
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="dealer-website">Website</label>
        <input id="dealer-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="dealer-name" label="Your name" required error={errors.name}>
          <input className={inputClass} {...field('name')} />
        </Field>
        <Field id="dealer-phone" label="Phone" required error={errors.phone}>
          <input type="tel" className={inputClass} {...field('phone')} />
        </Field>
        <Field id="dealer-email" label="Email" required error={errors.email}>
          <input type="email" className={inputClass} {...field('email')} />
        </Field>
        <Field id="dealer-businessName" label="Business name">
          <input className={inputClass} {...field('businessName')} />
        </Field>
        <Field id="dealer-monthlyRequirement" label="Monthly requirement" required error={errors.monthlyRequirement} hint="Approximate quantity is fine, for example tonnes per month.">
          <input className={inputClass} {...field('monthlyRequirement')} />
        </Field>
        <Field id="dealer-district" label="District" required error={errors.district}>
          <input className={inputClass} {...field('district')} />
        </Field>
        <Field id="dealer-state" label="State" required error={errors.state}>
          <input className={inputClass} {...field('state')} />
        </Field>
        <Field id="dealer-country" label="Country" required error={errors.country}>
          <input className={inputClass} {...field('country')} />
        </Field>
      </div>

      <Field id="dealer-message" label="Message">
        <textarea rows={4} className={inputClass} {...field('message')} />
      </Field>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-red-600" checked={values.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} />
          <span>I agree that SBF Rapid may contact me about this dealership application and will store my details as described in its privacy policy.</span>
        </label>
        {errors.consent && <p role="alert" className="text-sm text-red-600">{errors.consent}</p>}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          Your application could not be submitted. Please try again, or call customer care.
        </p>
      )}

      <SubmitButton disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…
          </>
        ) : (
          'Submit Application'
        )}
      </SubmitButton>
    </form>
  );
}
