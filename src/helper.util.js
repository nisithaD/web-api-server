const { format, createLogger, transports } = require("winston");

const { combine, timestamp, label, printf } = format;
const CATEGORY = "500 server errors";

//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: "debug",
    format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
    //logger method...
    transports: [
        //new transports:
        new transports.File({
            filename: "logs/error.log",
        }),
    ],
});

module.exports = {
    errorLogger: logger
}