export interface IAppLogger {
  logInfo: (message: string) => void;
  logError: (message: string) => void;
  logWarn: (message: string) => void;
}
