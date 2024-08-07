import dayjs from "dayjs";
import winston from "winston";
import { resolve } from "node:path";

export const logger = winston.createLogger({
  format: winston.format.printf(({ message }) => message),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: resolve(__dirname, `../logs/${dayjs().format("YYYY-MM-DD_HH-mm-ss")}.log`),
    }),
  ],
});
