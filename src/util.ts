export function toDateTimeLocaleString(date: Date) {
  return !(date instanceof Date)
    ? undefined
    : new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, -5);
}
