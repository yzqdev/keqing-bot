import { fileURLToPath } from "node:url";
import winston, { format, createLogger, transports } from "winston";
const { combine, timestamp, label, printf, colorize } = format;

export const defaultLog = (filename = '__filename') =>
  createLogger({
    format: format.combine(
      colorize({ all: true }),
      label({ label: filename }),
      format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
      // format.align(),
      format.printf(
        (info) =>
          `[${info.label}] ${info.timestamp}  ${info.level} : ${info.message}`,
      ),
    ),
    transports: [new transports.Console()],
  });
