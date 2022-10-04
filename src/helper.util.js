const { format, createLogger, transports } = require("winston");

const { combine, timestamp, label,  printf } = format;
const CATEGORY = "500 server errors";

//Using the printf format error.log.:Nuwan
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

//Using the printf format access.log.:Rumesh
const accessLogFormat=printf(({level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

//error.log.:Nuwan
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

//access.log:rumesh
const timelogger=createLogger({
    level:"info",
    format:combine(label({label:'Access log'}),timestamp(),accessLogFormat),

    transports:[
        new transports.File({
           filename:"logs/access.log" 
        })
    ]
})

module.exports = {
    errorLogger: logger,
    accessLogger:timelogger
}