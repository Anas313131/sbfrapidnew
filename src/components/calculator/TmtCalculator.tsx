import { useMemo, useState, type ChangeEvent } from 'react';
import { Calculator, Info } from 'lucide-react';
import { calculateTmtEstimate } from '@/lib/calculator';
import { Field, inputClass } from '@/components/ui/FormField';

const MIN_DIAMETER_MM = 8;
const MAX_DIAMETER_MM = 40;
const MAX_LENGTH_M = 1000;
const MAX_QUANTITY = 10000;

type Values = { diameter: string; length: string; quantity: string; rate: string };

const INITIAL_VALUES: Values = { diameter: '12', length: '12', quantity: '10', rate: '' };

function parseNumber(value: string) {
  const trimmed = value.trim();
  if (trimmed === '') return Number.NaN;
  return Number(trimmed);
}

function validate(values: Values) {
  const errors: Partial<Record<keyof Values, string>> = {};
  const diameter = parseNumber(values.diameter);
  const length = parseNumber(values.length);
  const quantity = parseNumber(values.quantity);
  const rate = parseNumber(values.rate);

  if (!(diameter >= MIN_DIAMETER_MM && diameter <= MAX_DIAMETER_MM)) {
    errors.diameter = `Enter a bar diameter between ${MIN_DIAMETER_MM} and ${MAX_DIAMETER_MM} mm.`;
  }
  if (!(length > 0 && length <= MAX_LENGTH_M)) {
    errors.length = `Enter a length greater than 0 and up to ${MAX_LENGTH_M} m.`;
  }
  if (!(Number.isInteger(quantity) && quantity >= 1 && quantity <= MAX_QUANTITY)) {
    errors.quantity = `Enter a whole number of bars between 1 and ${MAX_QUANTITY.toLocaleString('en-IN')}.`;
  }
  if (values.rate.trim() !== '' && !(rate >= 0)) {
    errors.rate = 'Enter a rate of zero or more, or leave this blank.';
  }

  return { errors, diameter, length, quantity, rate: values.rate.trim() === '' ? undefined : rate };
}

const numberFormat = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
const currencyFormat = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export function TmtCalculator() {
  const [values, setValues] = useState<Values>(INITIAL_VALUES);
  const [touched, setTouched] = useState(false);

  const checked = useMemo(() => validate(values), [values]);
  const hasErrors = Object.keys(checked.errors).length > 0;
  const result = hasErrors
    ? null
    : calculateTmtEstimate({
        diameterMm: checked.diameter,
        lengthM: checked.length,
        quantity: checked.quantity,
        ratePerKg: checked.rate,
      });

  const update = (field: keyof Values) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white">
          <Calculator className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-navy-900">TMT Weight Calculator</h3>
          <p className="text-sm text-slate-600">Estimate bar weight from diameter, length and quantity.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field id="calc-diameter" label="Bar diameter (mm)" required error={touched ? checked.errors.diameter : undefined}>
          <input
            id="calc-diameter"
            type="number"
            inputMode="decimal"
            min={MIN_DIAMETER_MM}
            max={MAX_DIAMETER_MM}
            step="any"
            value={values.diameter}
            onChange={update('diameter')}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && !!checked.errors.diameter}
            className={inputClass}
          />
        </Field>
        <Field id="calc-length" label="Length per bar (m)" required error={touched ? checked.errors.length : undefined}>
          <input
            id="calc-length"
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={values.length}
            onChange={update('length')}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && !!checked.errors.length}
            className={inputClass}
          />
        </Field>
        <Field id="calc-quantity" label="Number of bars" required error={touched ? checked.errors.quantity : undefined}>
          <input
            id="calc-quantity"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            value={values.quantity}
            onChange={update('quantity')}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && !!checked.errors.quantity}
            className={inputClass}
          />
        </Field>
        <Field id="calc-rate" label="Rate per kg (₹)" error={touched ? checked.errors.rate : undefined}>
          <input
            id="calc-rate"
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="Add to see cost"
            value={values.rate}
            onChange={update('rate')}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && !!checked.errors.rate}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="rounded-2xl bg-sky-100 p-5" aria-live="polite">
        {result ? (
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total length</dt>
              <dd className="mt-1 text-xl font-bold text-navy-900">{numberFormat.format(result.totalLengthM)} m</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Estimated weight</dt>
              <dd className="mt-1 text-xl font-bold text-navy-900">{numberFormat.format(result.totalWeightKg)} kg</dd>
            </div>
            {result.totalCost !== undefined && (
              <div className="col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Estimated material cost</dt>
                <dd className="mt-1 text-xl font-bold text-red-600">{currencyFormat.format(result.totalCost)}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="text-sm text-slate-600">Fix the highlighted fields to see your estimate.</p>
        )}
      </div>

      <p className="flex items-start gap-2 text-xs leading-[1.5] text-slate-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Theoretical estimate using weight (kg/m) = diameter² ÷ 162. Actual weight varies within manufacturing tolerances. This
        is not a quote or an engineering certificate.
      </p>
    </div>
  );
}
