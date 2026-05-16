const timePattern = /^([01]\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/;

export function normalizeTime(value: string): string {
  const match = value.match(timePattern);
  if (!match) {
    throw new Error(`Invalid time: ${value}`);
  }

  return `${match[1]}:${match[2]}`;
}

export function minutesFromTime(value: string): number {
  const normalized = normalizeTime(value);
  const [hours, minutes] = normalized.split(":").map(Number);
  return hours * 60 + minutes;
}

export function timeFromMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function addMinutes(value: string, minutesToAdd: number): string {
  return timeFromMinutes(minutesFromTime(value) + minutesToAdd);
}

export function overlaps(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  return minutesFromTime(startA) < minutesFromTime(endB) && minutesFromTime(endA) > minutesFromTime(startB);
}

export function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function dayOfWeek(value: string): number {
  return new Date(`${value}T00:00:00.000Z`).getUTCDay();
}

export function isPastDate(value: string): boolean {
  const today = new Date();
  const todayIso = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
    .toISOString()
    .slice(0, 10);

  return value < todayIso;
}
