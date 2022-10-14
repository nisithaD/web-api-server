const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label,  printf } = format;

//Using the printf format access.log.:Rumesh
const accessLogFormat=printf(({level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

//access.log:rumesh
function timelogger (req, res, next){ 
    createLogger({
    level:"info",
    format:combine(label({label:'Access log'}),timestamp(),accessLogFormat),

    transports:[
        new transports.File({
           filename:"logs/access.log" 
        })
    ]
}).info( req.originalUrl);
next();
}


module.exports = {

    accessLogger:timelogger,
    
}