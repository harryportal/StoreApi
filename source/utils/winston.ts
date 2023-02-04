import { createLogger, transports, format, addColors } from 'winston';
const { combine, timestamp, json, colorize, printf } = format;

const myLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  },
};

// configure level for production and development environment
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  return env == 'development' ? 'debug' : 'warn';
};

// add colors for different logging levels
addColors(myLevels.colors);

// create logger
const logger = createLogger({
  level: level(),
  levels: myLevels.levels, // pass the custom levels created
  format: combine(
    json(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize({ all: true }),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    // all logs should appear here
    new transports.File({ filename: 'logs/all.log' }),
    // error logs should appear here
    new transports.File({ filename: 'logs/errors.log', level: 'error' }),
  ],
  exceptionHandlers: [new transports.File({ level: 'error', filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new transports.File({ level: 'error', filename: 'logs/exceptions.log' })],
});

if (process.env.NODE_ENV != 'production') {
  const console_format = format.combine(format.colorize(), format.simple());
  logger.add(
    new transports.Console({
      level: 'info',
      format: console_format,
    }),
  );
  logger.exceptions.handle(new transports.Console({ format: console_format }));
  logger.rejections.handle(new transports.Console({ format: console_format }));
}

export default logger;
