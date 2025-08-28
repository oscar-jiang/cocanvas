export function formatMessageTime(date:string) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatMonthDay(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', // or 'short' for Jan, Feb, etc.
    day: 'numeric',
  });
}

export function formatYear(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', // or 'short' for Jan, Feb, etc.
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatMonthYear(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long', // or 'short' for Jan, Feb, etc.
    year: 'numeric',
  });
}