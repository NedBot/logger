<div align="center">
    <img src="https://imgur.com/bRiyAog.png" align="center" width="25%" alt="">
</div>

# @nedbot/logger

NedBot logger is a configuration wrapper for the [Winston](https://github.com/winstonjs/winston) logger.

## Installation

Yarn:

```shell
yarn add @nedbot/logger
```

NPM:

```shell
npm i @nedbot/logger
```

## Configuration

```typescript
import { Logger } from "@nedbot/logger";

const logger = new Logger({
  logFilesDirectory: "logs",
  mainLogFileName: "info",
  errorLogFileName: "error",
  timestampFormat: "DD/MM/YYYY @ HH:mm:ss",
  enableConsoleLogs: true,
  enableMainLogFile: true,
  enableErrorLogFile: true,
  fileDateFormat: "DD-MM-HH-YYYY",
  zippedArchive: true,
  maxSize: "2m",
  maxFiles: "14d",
  source: "NedBot",
  colors: {
    error: "red"
  }
});
```

##

## LoggerOptions

| Option             | Type             | Default               | Description                                                                                                                                    |
| ------------------ | ---------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| logFilesDirectory  | string           | logs                  | The path to the directory that will hold log files.                                                                                            |
| mainLogFileName    | string           | info                  | The name of the main log file.                                                                                                                 |
| errorLogFileName   | string           | error                 | The name of the error log file.                                                                                                                |
| timestampFormat    | string           | DD/MM/YYYY @ HH:mm:ss | The format of the log timestamps.                                                                                                              |
| enableConsoleLogs  | boolean          | true                  | Whether or not to enable console logs.                                                                                                         |
| enableMainLogFile  | boolean          | false                 | Whether or not to enable main file logs.                                                                                                       |
| enableErrorLogFile | boolean          | false                 | Whether or not to enable error file logs.                                                                                                      |
| fileDateFormat     | string           | DD-MM-HH-YYYY         | The date format for the log files.                                                                                                             |
| zippedArchive      | boolean          | true                  | Whether or not to gzip archived log files.                                                                                                     |
| maxSize            | string           | 2m                    | The maximum log file size. Specify the size, and the unit. Size is a number, unit is either k (for kb), m (for mb) or g (for gb). Example: 50m |
| maxFiles           | string \| number | 14d                   | The maximum count of saved log files. Use a number for file count, or a number suffixed by "d" for the amount of log file days to keep.        |
| source             | string           |                       | The logger source. If specified, this will be printed in the logs (helpful for knowing which logger printed a log entry).                      |
| colors             | LoggerColors     | {}                    | An object mapping each log level and console logger components to a color.                                                                     |
