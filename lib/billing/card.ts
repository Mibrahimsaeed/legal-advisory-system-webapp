// Formatting and validation for the demo checkout form. When Stripe Elements is
// connected, Stripe's own fields handle this and card data never reaches the app.
const digitsOnly = (value: string) => value.replace(/\D/g, "");

export function formatCardNumber(value: string): string {
  return digitsOnly(value).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function formatExpiry(value: string): string {
  const digits = digitsOnly(value).slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
}

export function formatCvc(value: string): string {
  return digitsOnly(value).slice(0, 4);
}

export function passesLuhn(cardNumber: string): boolean {
  const digits = digitsOnly(cardNumber);
  if (digits.length < 12) return false;
  let sum = 0;
  for (let index = 0; index < digits.length; index += 1) {
    let digit = Number(digits[digits.length - 1 - index]);
    if (index % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function isFutureExpiry(expiry: string, now = new Date()): boolean {
  const digits = digitsOnly(expiry);
  if (digits.length !== 4) return false;
  const month = Number(digits.slice(0, 2));
  const year = 2000 + Number(digits.slice(2));
  if (month < 1 || month > 12) return false;
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}
