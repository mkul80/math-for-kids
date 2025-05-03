export class Logger {
  static log(...messages: any[]): void {
    // console.log(...messages);
  }

  static error(...message: any[]): void {
    console.error(...message);
  }
}
