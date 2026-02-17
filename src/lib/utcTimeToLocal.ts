import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Converts a time string ('HH:mm') in UTC to the browser's local time in AM/PM format.
 * @param time - The time string in UTC (e.g. '18:00')
 * @returns Local time string in 'h:mm A' format (browser tz)
 */
export function utcTimeToLocal(time: string): string {
  const browserTz = dayjs.tz.guess();
  const [hour, minute] = time.split(':').map(Number);
  // Create a dayjs object for today at the given UTC time
  let utcTime = dayjs
    .utc(dayjs().format('YYYY-MM-DD'))
    .set('hour', hour)
    .set('minute', minute)
    .set('second', 0)
    .set('millisecond', 0);
  if (!utcTime.isValid()) {
    utcTime = dayjs.utc(dayjs().format('YYYY-MM-DD')).set('hour', 0).set('minute', 0);
  }
  // Convert to browser's local time zone
  const local = utcTime.tz(browserTz);
  return local.format('h:mm A');
}
