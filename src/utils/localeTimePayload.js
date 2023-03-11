export const localeTimePayload = (utc_offset_seconds) => {
  const year = new Date().getUTCFullYear();
  const month = new Date().getUTCMonth();
  const date = new Date().getUTCDate();
  const hours = new Date().getUTCHours();
  const minutes = new Date().getUTCMinutes();
  const seconds = new Date().getUTCSeconds();
  const localeTimeMilli = new Date(year, month, date, hours, minutes, seconds).getTime() + (utc_offset_seconds * 1000);
  return localeTimeMilli;
};