import { format } from "winston";
const { printf, colorize } = format;

export const defaultTimestamp = "DD/MM/YYYY|HH:mm:ss";
export const defaultInfoFileName = "info.log";
export const defaultErrorFileName = "error.log";

export const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4
}

export const colors = {
    timestamp: "magenta",
    source: "magenta",
    info: "green",
    error: "red",
    warn: "yellow",
    verbose: "blue",
    debug: "grey",
}

export const consoleFormat = printf(({ message, level, timestamp, source }) => {
    const colorizedTimestamp = colorize().colorize("timestamp", timestamp);
    const colorizedSource = colorize().colorize("source", source);
    const colorizedMessage = colorize().colorize(level, message)
    return `[${colorizedTimestamp}] ${colorizedSource} | ${colorizedMessage}`;
});