import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getCountryCallingCode,
  CountryCode,
  getCountries,
} from 'libphonenumber-js';

// Generate country flag map dynamically from all supported countries
function generateCountryFlagMap(): Record<string, string> {
  const flagMap: Record<string, string> = {};
  const countries = getCountries();

  countries.forEach((code) => {
    flagMap[code] = countryCodeToFlag(code);
  });

  return flagMap;
}

// Convert country code to flag emoji
function countryCodeToFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const countryFlagMap = generateCountryFlagMap();

export interface PhoneNumberInfo {
  isValid: boolean;
  countryCode: string | null;
  countryName: string | null;
  flag: string;
  nationalNumber: string | null;
  formattedNumber: string | null;
  e164Number: string | null;
  error: string | null;
}

/**
 * Detects country from phone number input
 * Handles formats like:
 * - +923146601881 (international)
 * - 923146601881 (with country code)
 * - 03146601881 (national format for Pakistan)
 */
export function detectAndValidatePhoneNumber(
  input: string,
  defaultCountry: string = 'PK'
): PhoneNumberInfo {
  const result: PhoneNumberInfo = {
    isValid: false,
    countryCode: null,
    countryName: null,
    flag: '🌐', // Unknown flag
    nationalNumber: null,
    formattedNumber: null,
    e164Number: null,
    error: null,
  };

  if (!input || input.trim() === '') {
    return result;
  }

  try {
    // Normalize input
    let normalizedInput = input.replace(/\s+/g, '');

    // If input starts with 0 and doesn't start with +, assume it's national format for default country
    if (normalizedInput.startsWith('0') && !normalizedInput.startsWith('+')) {
      const callingCode = getCountryCallingCode(defaultCountry as CountryCode);
      normalizedInput = `+${callingCode}${normalizedInput.slice(1)}`;
    }

    // If input doesn't start with + or country code, add +
    if (!normalizedInput.startsWith('+') && !/^\d{1,3}/.test(normalizedInput)) {
      normalizedInput = `+${normalizedInput}`;
    }

    // Try to parse the phone number
    const parsed = parsePhoneNumber(normalizedInput, defaultCountry as CountryCode);

    if (!parsed) {
      result.error = 'Invalid phone number format';
      return result;
    }

    const country = parsed.country;
    const isValid = country ? isValidPhoneNumber(normalizedInput, country) : false;

    if (country) {
      result.countryCode = country;
      result.countryName = getCountryNameByCode(country);
      result.flag = countryFlagMap[country] || '🌐';
    }

    result.nationalNumber = parsed.formatNational();
    result.e164Number = parsed.format('E.164');
    result.formattedNumber = parsed.format('INTERNATIONAL');

    if (!isValid) {
      result.error = 'Phone number length is incorrect for this country';
      result.isValid = false;
      // Show unknown flag if validation fails
      result.flag = '🌐';
      return result;
    }

    result.isValid = true;
    return result;
  } catch (error) {
    result.error = 'Invalid phone number format';
    result.flag = '🌐';
    return result;
  }
}

/**
 * Get country name from country code
 * Uses Intl API for comprehensive country names
 */
function getCountryNameByCode(code: string | undefined): string | null {
  if (!code) return null;

  try {
    // Use Intl.DisplayNames for comprehensive country name support
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return displayNames.of(code) || code;
  } catch {
    // Fallback if Intl is not available
    return code;
  }
}

/**
 * Extract just the phone number without country code
 */
export function extractPhoneNumber(input: string): string {
  return input.replace(/[^\d]/g, '');
}
