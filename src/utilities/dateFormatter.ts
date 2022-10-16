export default class dateFormatter {
  public static formatDate(dt: Date): string {
    const result = dt.toISOString();

    return result.substring(0, 10);
  }
}
