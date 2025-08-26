import { createLogger, format, transports } from "winston";
import path from "path";

const logPath = path.join(process.cwd(), "logs", "live_well_uti_agent.log");

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: logPath, level: "info" })
  ],
});

export const logUserInput = (input) => {
  logger.info('User Input', {
    role: 'user',
    content: input,
    timestamp: new Date().toISOString()
  });
};

export const logAgentResponse = (response) => {
  logger.info('Agent Response', {
    role: 'agent',
    content: response,
    timestamp: new Date().toISOString()
  });
};

export const logSystemEvent = (event, details = {}) => {
  logger.info('System Event', {
    role: 'system',
    event,
    ...details,
    timestamp: new Date().toISOString()
  });
};
