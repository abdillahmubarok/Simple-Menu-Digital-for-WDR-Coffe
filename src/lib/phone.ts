/**
 * Normalizes an Indonesian phone number to E.164 format (+62...).
 * Handles prefixes like '0', '62', '+62'.
 * Returns the normalized number or null if the format is invalid.
 */
export function normalizePhoneNumber(phone: string): string | null {
  if (!phone || typeof phone !== 'string') return null;

  // Remove all non-digit characters except for a leading '+'
  const cleaned = phone.trim().replace(/[\s-()]/g, '');

  if (cleaned.startsWith('08')) {
    return `+62${cleaned.substring(1)}`;
  }
  if (cleaned.startsWith('628')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('+628')) {
    return cleaned;
  }

  return null; // Invalid format
}

/**
 * Validates an Indonesian phone number.
 * A valid number, after normalization, should be between 11 and 15 characters long.
 * e.g., +6281234567890
 */
export function isValidIndonesianPhoneNumber(phone: string): boolean {
  const normalized = normalizePhoneNumber(phone);
  if (!normalized) return false;

  // After normalization to +62..., length should be between +62 + 8 digits (11) and +62 + 13 digits (15)
  // 8[1-9][0-9]{6,11} means 8 + 7 to 12 digits, so total length is 10 to 15. With +62, it is 12 to 17.
  // Standard is 9 to 13 digits after the 0. so 08xxxxxxxxx (11) to 08xxxxxxxxxxx (14)
  const phoneDigits = normalized.substring(3); // remove '+62'
  return /^[1-9]\d{7,11}$/.test(phoneDigits);
}
