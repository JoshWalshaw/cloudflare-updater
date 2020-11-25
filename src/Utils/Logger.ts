import * as winston from "winston";

export class Logger {

    private static ConsoleFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    );

    private static LoggingFormat = winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    );

    private static _Logger: winston.Logger = winston.createLogger({
        format: Logger.LoggingFormat,
        level: 'info',
        transports: [
            new winston.transports.File({filename: 'error.log', level: 'error'}),
            new winston.transports.File({filename: 'combined.log'}),
            new winston.transports.Console({format: Logger.ConsoleFormat})
        ]
    })

    public static getLogger(): winston.Logger {
        return Logger._Logger;
    }


}
