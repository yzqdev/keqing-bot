import { fileURLToPath } from "node:url";
import winston, { format, createLogger, transports } from "winston";
const { combine, timestamp, label, printf, colorize } = format;
import DailyRotateFile from "winston-daily-rotate-file";
const transport: DailyRotateFile = new DailyRotateFile({
  filename: "keqing-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  dirname: "log",
});
export const defaultLog = (filename = "__filename") =>
  createLogger({
    format: format.combine(
      colorize({ all: true }),
      label({ label: filename }),
      format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
      // format.align(),
      format.printf(
        (info) =>
          ` ${info.timestamp} [${info.label}] ${info.level} : ${info.message}`,
      ),
    ),
    transports: [new transports.Console(), transport],
  });
