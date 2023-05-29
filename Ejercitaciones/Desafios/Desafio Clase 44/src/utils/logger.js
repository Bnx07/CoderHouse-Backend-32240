import winston from 'winston';
import config from '../config/config.js';

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'magenta',
        info: 'blue',
        debug: 'white'
    }
}

let logger;

if (config.logger == "PRODUCTION") {

    console.log("Se ha iniciado el logger de producción");

    logger = winston.createLogger({
        levels: customLevelOptions.levels,
    
        transports: [
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
            )}),
    
            new winston.transports.File({ 
                filename: './errors.log', 
                level:'error', 
                format: winston.format.simple()
            })
        ]
    })

} else {

    console.log("Se ha iniciado el logger de desarrollo");

    logger = winston.createLogger({
        levels: customLevelOptions.levels,
    
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
            )}),
    
            new winston.transports.File({ 
                filename: './errors.log', 
                level: 'error', 
                format: winston.format.simple()
            })
        ]
    })

}

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.fatal(`${req.method} con ${req.url} - ${new Date().toLocaleDateString()}`);
    next();
}

export { logger };