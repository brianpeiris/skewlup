import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.cli(),
    winston.format.timestamp(),
    winston.format.printf((l) => `${l.timestamp} ${l.level}: ${l.message}`)
  ),
});
logger.add(new winston.transports.Console());

export default logger;
