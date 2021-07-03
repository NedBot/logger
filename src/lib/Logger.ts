import Winston, { format, transport, transports } from "winston";
import { LogLevels, LogLevel, LoggerColor, Defaults } from "../util/Constants";
import { inspect } from "util";
import { join } from "path";

const colorizer = format.colorize();

export class Logger {
  /**
   * The directory that holds the log files.
   */
  public logFilesDirectory: string;

  /**
   * The name of the main log file.
   */
  public mainLogFileName: string;

  /**
   * The name of the error log file.
   */
  public errorLogFileName: string;

  /**
   * Whether or not console logs are enabled.
   */
  public enableConsoleLogs: boolean;

  /**
   * Whether or not main file logs are enabled.
   */
  public enableMainLogFile: boolean;

  /**
   * Whether or not error file logs are enabled.
   */
  public enableErrorLogFile: boolean;

  /**
   * The format of the log timestamp.
   */
  public timestampFormat: string;

  /**
   * The source name.
   */
  public source?: string;

  /**
   * The winston logger.
   */
  #winston: Winston.Logger;

  /**
   * @param options The logger options.
   */
  public constructor(options: Partial<LoggerOptions>) {
    this.logFilesDirectory = options.logFilesDirectory ?? Defaults.logFilesDirectory;
    this.mainLogFileName = options.mainLogFileName ?? Defaults.mainLogFileName;
    this.errorLogFileName = options.errorLogFileName ?? Defaults.errorLogFileName;
    this.timestampFormat = options.timestampFormat ?? Defaults.timestampFormat;
    this.enableConsoleLogs = options.enableConsoleLogs ?? true;
    this.enableMainLogFile = options.enableMainLogFile ?? false;
    this.enableErrorLogFile = options.enableErrorLogFile ?? false;
    this.source = options.source;

    if (!this.enableConsoleLogs && !this.enableMainLogFile && !this.enableErrorLogFile) {
      throw new Error("You must enable at least one transport.");
    }

    Winston.addColors(options.colors || Defaults.colors);

    this.#winston = Winston.createLogger({
      transports: this.createTransports(),
      levels: LogLevels
    });
  }

  /**
   * Prints a line using the info level.
   * @param message The message to log
   * @param meta The meta data
   */
  public log(message: any, ...meta: any[]) {
    this.info(message, ...meta);
  }

  /**
   * Prints a line using the info level.
   * @param message The message to log
   * @param meta The meta data
   */
  public info(message: any, ...meta: any[]) {
    this.#winston.info(this.inspect(message), { meta });
  }

  /**
   * Prints a line using the error level.
   * @param error The error to log
   * @param meta The meta data
   */
  public error(error: Error | string, ...meta: any[]) {
    const stack = error instanceof Error ? error.stack || error.message : error;
    const message = error instanceof Error ? error.message : error;
    this.#winston.error(message, { meta, stack });
  }

  /**
   * Prints a line using the warn level.
   * @param message The message to log
   * @param meta The meta data
   */
  public warn(message: string, ...meta: any[]) {
    this.#winston.warn(this.inspect(message), { meta });
  }

  /**
   * Prints a line using the verbose level.
   * @param message The message to log
   * @param meta The meta data
   */
  public verbose(message: string, ...meta: any[]) {
    this.#winston.verbose(this.inspect(message), { meta });
  }

  /**
   * Prints a line using the debug level.
   * @param message The message to log
   * @param meta The meta data
   */
  public debug(message: string, ...meta: any[]) {
    this.#winston.debug(this.inspect(message), { meta });
  }

  /**
   * Inspects a message.
   * @param message The message to inspect
   * @returns The inspected message
   */
  private inspect(message: any) {
    if (typeof message === "string") return message;
    return inspect(message, { depth: 1 });
  }

  /**
   * Creates the transports for the logger.
   * @returns The transports
   */
  private createTransports(): transport[] {
    const timestampFormat = this.createTimestampFormat();
    const consoleFormat = this.createConsoleFormat();

    const loggerTransports: transport[] = [];

    if (this.enableConsoleLogs) {
      const consoleTransport = new transports.Console({
        format: format.combine(timestampFormat, consoleFormat),
        level: LogLevel.DEBUG
      });

      loggerTransports.push(consoleTransport);
    }

    if (this.enableMainLogFile) {
      const mainFileTransport = new transports.File({
        filename: join(this.logFilesDirectory, this.mainLogFileName),
        format: format.combine(timestampFormat, format.json()),
        level: LogLevel.VERBOSE
      });

      loggerTransports.push(mainFileTransport);
    }

    if (this.enableErrorLogFile) {
      const errorFileTransport = new transports.File({
        filename: join(this.logFilesDirectory, this.errorLogFileName),
        format: format.combine(timestampFormat, format.json()),
        level: LogLevel.WARN
      });

      loggerTransports.push(errorFileTransport);
    }

    return loggerTransports;
  }

  /**
   * Creates a timestamp format.
   * @returns The timestamp format
   */
  private createTimestampFormat() {
    return format.timestamp({ format: this.timestampFormat });
  }

  /**
   * Creates a console format.
   * @returns The console format
   */
  private createConsoleFormat() {
    return format.printf(({ level, message, timestamp }) => {
      let consoleFormat = "";

      const colorizedTimestamp = colorizer.colorize("timestamp", `[${timestamp}]`);
      consoleFormat += `${colorizedTimestamp} `;

      if (this.source) {
        const colorizedSource = colorizer.colorize("source", this.source);
        consoleFormat += `${colorizedSource} `;
      }

      const colorizedLevel = colorizer.colorize(`${level}BG`, level);
      consoleFormat += `(${colorizedLevel}): `;

      const colorizedMessage = colorizer.colorize(level, message);
      consoleFormat += colorizedMessage;

      return consoleFormat;
    });
  }
}

export interface LoggerOptions {
  logFilesDirectory: string;
  mainLogFileName: string;
  errorLogFileName: string;
  timestampFormat: string;
  enableConsoleLogs: boolean;
  enableMainLogFile: boolean;
  enableErrorLogFile: boolean;
  source: string;
  colors: LoggerColors;
}

export type LoggerColors = Record<string, LoggerColor>;
