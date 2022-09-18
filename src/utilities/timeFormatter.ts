export default class timeFormatter {
  public static formatTime(s: number): string {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return (
      timeFormatter.padTime(hrs) +
      ":" +
      timeFormatter.padTime(mins) +
      ":" +
      timeFormatter.padTime(secs)
    );
  }

  private static padTime(time: number): string {
    return time.toString().padStart(2, "0");
  }
}
