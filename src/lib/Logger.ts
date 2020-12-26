import { transports, transport, format, Logger as Winston, createLogger } from "winston";
import { join } from "path";
import { defaultTimestamp, defaultInfoFileName, defaultErrorFileName,
    consoleFormat, levels } from "./Constants";

const { Console, File } = transports;
const { combine, timestamp, json } = format;

export class Logger {
    public logFileDirectory: string;
    public timestamp: string;
    public infoLogFileName: string;
    public errorLogFileName: string;
    public enableConsoleLogs: boolean;
    public enableInfoLogs: boolean;
    public enableErrorLogs: boolean;

    #logger: Winston;

    public constructor(logFileDirectory: string, options: Partial<LoggerOptions>) {
        this.logFileDirectory = logFileDirectory;
        this.timestamp = options.timestamp ?? defaultTimestamp;
        this.infoLogFileName = options.infoLogFileName ?? defaultInfoFileName;
        this.errorLogFileName = options.errorLogFileName ?? defaultErrorFileName;
        this.enableConsoleLogs = options.enableConsoleLogs ?? true;
        this.enableInfoLogs = options.enableInfoLogs ?? true;
        this.enableErrorLogs = options.enableErrorLogs ?? true;

        this.#logger = createLogger({
            transports: this.transports,
            levels
        });
    }

    private get transports() {
        const { timestampFormat, logFileDirectory,
            infoLogFileName, errorLogFileName,
            enableConsoleLogs, enableInfoLogs,
            enableErrorLogs } = this;

        const ConsoleTransport = new Console({
            format: combine(timestampFormat, consoleFormat),
            level: "debug"
        });

        const InfoTransport = new File({
            filename: join(logFileDirectory, infoLogFileName),
            format: combine(timestampFormat, json()),
            level: "verbose"
        });

        const ErrorTransport = new File({
            filename: join(logFileDirectory, errorLogFileName),
            format: combine(timestampFormat, json()),
            level: "warn"
        });

        return [
            enableConsoleLogs ? ConsoleTransport : null,
            enableInfoLogs ? InfoTransport : null,
            enableErrorLogs ? ErrorTransport : null
        ].filter(Boolean) as transport[];
    }

    private get timestampFormat() {
        return timestamp({ format: this.timestamp });
    }
}


export interface LoggerOptions {
    timestamp: string;
    infoLogFileName: string;
    errorLogFileName: string;
    enableConsoleLogs: boolean;
    enableInfoLogs: boolean;
    enableErrorLogs: boolean;
}