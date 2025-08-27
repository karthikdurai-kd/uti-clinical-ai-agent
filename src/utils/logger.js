import { createLogger, format, transports } from "winston";
import path from "path";

const logPath = path.join(process.cwd(), "logs", "uti_agent.log");

// Create a logger for the UTI AI Agent
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

// Log the user input
export const logUserInput = (input) => {
  logger.info('User Input', {
    role: 'user',
    content: input,
    timestamp: new Date().toISOString()
  });
};

// Log the agent response
export const logAgentResponse = (response) => {
  logger.info('Agent Response', {
    role: 'agent',
    content: response,
    timestamp: new Date().toISOString()
  });
};

// Log the system event
export const logSystemEvent = (event, details = {}) => {
  logger.info('System Event', {
    role: 'system',
    event,
    ...details,
    timestamp: new Date().toISOString()
  });
};
