import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { isValidEmail, isValidPhone } from '@/lib/validation';
import { Field, inputClass } from '@/components/ui/FormField';
import { SubmitButton } from '@/components/ui/Button';

const SUBJECTS = ['Product enquiry', 'Bulk or project quote', 'Dealer / channel partner', 'Technical support', 'Other'];

type Values = { name: string; email: string; phone: string; subject: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: '', email: '', phone: '', subject: '', message: '', consent: false };

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!isValidEmail(values.email)) errors.email = 'Please enter a valid email address.';
  if (!isValidPhone(values.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!values.subject) errors.subject = 'Please choose a subject.';
  if (!values.message.trim()) errors.message = 'Please write a short message.';
  if (values.message.length > 2000) errors.message = 'Please keep your message under 2000 characters.';
  if (!values.consent) errors.consent = 'Please agree to be contacted about your enquiry.';
  return errors;
}

export function ContactForm() {
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
    const { error } = await supabase.from('contact_enquiries').insert({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      subject: values.subject,
      message: values.message.trim(),
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
        <h2 className="text-2xl font-bold text-navy-900">Thank you, your enquiry is with our team</h2>
        <p className="max-w-md text-slate-600">We usually reply within 24 hours on working days.</p>
        <button type="button" onClick={() => setStatus('idle')} className="text-sm font-semibold text-navy-900 underline underline-offset-4">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-name" label="Name" required error={errors.name}>
          <input id="contact-name" autoComplete="name" className={inputClass} value={values.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
        </Field>
        <Field id="contact-email" label="Email" required error={errors.email}>
          <input id="contact-email" type="email" autoComplete="email" className={inputClass} value={values.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
        </Field>
        <Field id="contact-phone" label="Phone" required error={errors.phone}>
          <input id="contact-phone" type="tel" autoComplete="tel" className={inputClass} value={values.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} />
        </Field>
        <Field id="contact-subject" label="Subject" required error={errors.subject}>
          <select id="contact-subject" className={inputClass} value={values.subject} onChange={(e) => set('subject', e.target.value)} aria-invalid={!!errors.subject}>
            <option value="">Select a subject</option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="contact-message" label="Message" required error={errors.message}>
        <textarea id="contact-message" rows={5} className={inputClass} value={values.message} onChange={(e) => set('message', e.target.value)} aria-invalid={!!errors.message} placeholder="Tell us about your requirement" />
      </Field>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-red-600" checked={values.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} />
          <span>I agree that SBF Rapid may contact me about this enquiry and will store my details as described in its privacy policy.</span>
        </label>
        {errors.consent && <p role="alert" className="text-sm text-red-600">{errors.consent}</p>}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          Your message could not be sent. Please try again, or call customer care.
        </p>
      )}

      <SubmitButton disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          'Submit Message'
        )}
      </SubmitButton>
    </form>
  );
}
