
/**
 * 
 * @param {Number} utc_offset_seconds - Receives a number with the difference in seconds from locale time and Greenwwich.
 * @returns Number with the present time in milliseconds for chosen city.
 */

export const localeTimePayload = (utc_offset_seconds) => {
  const year = new Date().getUTCFullYear();
  const month = new Date().getUTCMonth();
  const date = new Date().getUTCDate();
  const hours = new Date().getUTCHours();
  const minutes = new Date().getUTCMinutes();
  const seconds = new Date().getUTCSeconds();
  const localeTimeInMilliseconds = new Date(year, month, date, hours, minutes, seconds).getTime() + (utc_offset_seconds * 1000);
  return localeTimeInMilliseconds;
};