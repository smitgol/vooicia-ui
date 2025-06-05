/**
 * Removes country code from a phone number
 * @param phoneNumber - The phone number to process (can include country code)
 * @returns The phone number without country code
 */
export const removeCountryCode = (phoneNumber: string): string => {
  if (!phoneNumber) return '';
  
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // If the number starts with 91 (India code) and is longer than 10 digits, remove the 91
  if (cleaned.startsWith('91') && cleaned.length > 10) {
    return cleaned.substring(2);
  }
  
  // If the number starts with +91 and is longer than 10 digits, remove the +91
  if (phoneNumber.trim().startsWith('+91') && cleaned.length > 10) {
    return cleaned.substring(2);
  }
  
  // If the number is longer than 10 digits, assume first digits are country code and remove them
  if (cleaned.length > 10) {
    return cleaned.substring(cleaned.length - 10);
  }
  
  return cleaned;
};
