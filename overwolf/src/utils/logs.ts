/**
 * Overwolf log files only contain strings. Thus, it's required to stringify objects.
 * console.error is synchron which might block or slow down the UI. To prevent this, the logs are written asynchronous.
 */

// eslint-disable-next-line no-unused-vars
type Logger = (message?: unknown, ...optionalParams: unknown[]) => void;

function log(logger: Logger) {
  return (...data: unknown[]) => {
    setTimeout(() => logger(...data.map((item) => JSON.stringify(item))), 1);
  };
}

export const writeLog = log(console.log);
const errorLogger = log(console.error);
export const writeError = (error: unknown) => {
  if (error instanceof Error) {
    errorLogger(error.message, error.stack);
  } else {
    errorLogger(error);
  }
};
export const writeInfo = log(console.info);
export const writeWarn = log(console.warn);
