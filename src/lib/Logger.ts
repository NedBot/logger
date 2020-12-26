import { defaultTimestamp, defaultInfoFileName, defaultErrorFileName } from "./Constants";

export class Logger {
    public logFileDirectory: string;
    public timestamp: string;
    public infoLogFileName: string;
    public errorLogFileName: string;
    public enableConsoleLogs: boolean;
    public enableInfoLogs: boolean;
    public enableErrorLogs: boolean;

    public constructor(logFileDirectory: string, options: Partial<LoggerOptions>) {
        this.logFileDirectory = logFileDirectory;
        this.timestamp = options.timestamp ?? defaultTimestamp;
        this.infoLogFileName = options.infoLogFileName ?? defaultInfoFileName;
        this.errorLogFileName = options.errorLogFileName ?? defaultErrorFileName;
        this.enableConsoleLogs = options.enableConsoleLogs ?? true;
        this.enableInfoLogs = options.enableInfoLogs ?? true;
        this.enableErrorLogs = options.enableErrorLogs ?? true;
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