// Shared helpers used by several components (avoids repeating the same code).

// Turns '21K' into the Arabic label 'عيار 21'
export function karatLabel(karat: string): string {
  return 'عيار ' + karat.replace('K', '');
}

// Turns '2026-09-22' into a short Arabic date, e.g. '22 سبتمبر'
export function formatShortDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ar-OM-u-ca-gregory', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

// Turns '2026-09-22' into a full Arabic date, e.g. '22 سبتمبر 2026'
export function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ar-OM-u-ca-gregory', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
