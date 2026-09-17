// #region Date formatting
export function getToday() {
  const parts = new Intl.DateTimeFormat('da-DK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const weekday = values.weekday.charAt(0).toUpperCase() + values.weekday.slice(1);
  return { weekday, date: `${values.day}. ${values.month}` };
}
// #endregion
