import dayjs from "dayjs";
import winston from "winston";

export const logger = winston.createLogger({
  format: winston.format.printf(({ message }) => message),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `./logs/${dayjs().format("YYYY-MM-DD_HH-mm-ss")}.log` }),
  ],
});
