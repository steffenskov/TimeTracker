export default class timeFormatter {
  public static formatTime(s: number): string {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return (
      timeFormatter.padTime(hrs) +
      ":" +
      timeFormatter.padTime(mins) +
      ":" +
      timeFormatter.padTime(secs)
    );
  }

  public static formatTimeFromDate(dt: Date): string {
    const datePart = new Date(dt.toDateString());
    const timePart = dt.getTime() - datePart.getTime();
    return timeFormatter.formatTime(timePart);
  }

  private static padTime(time: number): string {
    return time.toString().padStart(2, "0");
  }
}
