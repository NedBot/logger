# Nedbot Logger

NedBot project logs initialisation.

Logging is important to keep track of your outputs, warnings, and errors.  
This repository configures the [winston](https://github.com/winstonjs/winston) logger for NedBot's projects.

If you wish to use our setup for winston in your project:

### Installation

Yarn:
```shell
yarn add @nedbot/logger
```

NPM:
```shell
npm i @nedbot/logger
```

### Usage

```typescript
import { Logger } from "@nedbot/logger";

const logger = new Logger({
    logFileDirectory: "./logs",
    infoLogFileName: "nedbot.log",
    errorLogFileName: "error.log",
    enableConsoleLogs: true,
    enableInfoLogs: true,
    enableErrorLogs: true
});

logger.info("Database", "Connected to the database");

logger.error("Database", error);
```

### LoggerOptions

| Option            | Type    | Optional | Default   | Description                                 |
|-------------------|---------|----------|-----------|---------------------------------------------|
| logFileDirectory  | string  |          |           | The path to your logs folder                |
| infoLogFileName   | string  | ✓        | info.log  | The name of the file to store all log types |
| errorLogFileName  | string  | ✓        | error.log | The name of the file to store error logs    |
| enableConsoleLogs | boolean | ✓        | true      | Whether to send logs to the console         |
| enableInfoLogs    | boolean | ✓        | true      | Whether to send logs to your info log file  |
| enableErrorLogs   | boolean | ✓        | true      | Whether to send logs to your error log file |






