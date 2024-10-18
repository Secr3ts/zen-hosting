// /src/lib/logger.ts

import { createLogger, format, transports } from "winston";

const customFormat = format.printf(({ level, message, timestamp, service }) => {
    return `${timestamp} [${service}] ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        customFormat
    ),
    transports: [
        new transports.Console({ format: format.combine(format.colorize(), format.simple()) }),
        // new transports.File({ filename: '/logs/error.log', level: 'error' }),
        // new transports.File({ filename: '/logs/combined.log' }),
    ],

});

export default logger;