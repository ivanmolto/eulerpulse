export function relativeDate(date: string | Date): string {
  const now = Date.now();
  const dateTime = new Date(date).getTime();
  const delta = Math.round((now - dateTime) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (delta < 30) {
    return "Now";
  } else if (delta < 2 * minute) {
    return "1min";
  } else if (delta < hour) {
    return Math.floor(delta / minute) + "min";
  } else if (Math.floor(delta / hour) == 1) {
    return "1h";
  } else if (delta < day) {
    return Math.floor(delta / hour) + "h";
  } else if (delta < day * 2) {
    return "1d";
  } else {
    return Math.floor(delta / day) + "d";
  }
}
