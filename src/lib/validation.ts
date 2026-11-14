const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\-\s\d]{6,30}$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string) {
  const trimmed = value.trim();
  return PHONE_PATTERN.test(trimmed) && (trimmed.match(/\d/g)?.length ?? 0) >= 6;
}
