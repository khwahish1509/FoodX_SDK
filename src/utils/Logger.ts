/**
 * Log severity levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Log entry structure
 */
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  data?: any;
  error?: Error;
}

/**
 * Logger configuration
 */
export interface LoggerConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  enableMetrics: boolean;
}

/**
 * Default logger configuration
 */
const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: LogLevel.INFO,
  enableConsole: true,
  enableMetrics: false
};

/**
 * Global logger configuration
 */
let globalConfig: LoggerConfig = { ...DEFAULT_CONFIG };

/**
 * Configure all logger instances
 * @param config Logger configuration
 */
export function configureLogger(config: Partial<LoggerConfig>): void {
  globalConfig = { ...globalConfig, ...config };
}

/**
 * Utility for structured logging
 */
export class Logger {
  private context: string;
  
  /**
   * Create a new logger instance
   * @param context Context name for this logger
   */
  constructor(context: string) {
    this.context = context;
  }
  
  /**
   * Log a debug message
   * @param message Log message
   * @param data Optional data to include
   */
  public debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }
  
  /**
   * Log an info message
   * @param message Log message
   * @param data Optional data to include
   */
  public info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }
  
  /**
   * Log a warning message
   * @param message Log message
   * @param data Optional data to include
   */
  public warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }
  
  /**
   * Log an error message
   * @param message Log message
   * @param error Optional error to include
   * @param data Optional data to include
   */
  public error(message: string, error?: any, data?: any): void {
    this.log(LogLevel.ERROR, message, data, error);
  }
  
  /**
   * Create a new logger with a child context
   * @param childContext Additional context to append
   */
  public createChildLogger(childContext: string): Logger {
    return new Logger(`${this.context}.${childContext}`);
  }
  
  /**
   * Log a message at the specified level
   * @param level Log level
   * @param message Log message
   * @param data Optional data to include
   * @param error Optional error to include
   */
  private log(level: LogLevel, message: string, data?: any, error?: Error): void {
    // Skip if level is below minimum level
    if (!this.shouldLog(level)) {
      return;
    }
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
      data,
      error
    };
    
    // Log to console if enabled
    if (globalConfig.enableConsole) {
      this.logToConsole(entry);
    }
    
    // Log to metrics if enabled
    if (globalConfig.enableMetrics) {
      this.logToMetrics(entry);
    }
  }
  
  /**
   * Determine if the specified level should be logged
   * @param level Log level to check
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const minLevelIndex = levels.indexOf(globalConfig.minLevel);
    const levelIndex = levels.indexOf(level);
    
    return levelIndex >= minLevelIndex;
  }
  
  /**
   * Log to console
   * @param entry Log entry
   */
  private logToConsole(entry: LogEntry): void {
    const { timestamp, level, context, message, data, error } = entry;
    
    // Format: [TIMESTAMP] LEVEL [CONTEXT] MESSAGE
    const prefix = `[${timestamp}] ${level.toUpperCase()} [${context}]`;
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`${prefix} ${message}`, data || '');
        break;
      case LogLevel.INFO:
        console.info(`${prefix} ${message}`, data || '');
        break;
      case LogLevel.WARN:
        console.warn(`${prefix} ${message}`, data || '');
        break;
      case LogLevel.ERROR:
        console.error(`${prefix} ${message}`, error || '', data || '');
        break;
    }
  }
  
  /**
   * Log to metrics system (placeholder for actual implementation)
   * @param entry Log entry
   */
  private logToMetrics(entry: LogEntry): void {
    // This would be implemented to send logs to a metrics/monitoring system
    // For now it's just a placeholder
  }
} 