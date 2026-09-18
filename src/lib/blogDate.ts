/**
 * Publication dates, shown the way a reader expects them.
 *
 * The post page was printing the raw ISO string ("2026-09-08"), which tells a
 * visitor very little at a glance, and the listing showed no date at all — so
 * there was no way to tell a piece written this week from one written last year.
 */
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "2026-09-08" -> "8 September 2026". Returns the input if it is not a date. */
export function formatBlogDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
  if (!m) return iso || '';
  const [, y, mo, d] = m;
  const month = MONTHS[Number(mo) - 1];
  if (!month) return iso;
  return `${Number(d)} ${month} ${y}`;
}

/** Machine-readable value for <time dateTime="…">, which is what crawlers read. */
export function isoDate(iso: string): string {
  return /^\d{4}-\d{2}-\d{2}/.test(iso || '') ? iso.slice(0, 10) : '';
}
