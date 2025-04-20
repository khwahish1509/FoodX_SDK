/**
 * Log severity levels
 */
export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
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
 * Configure all logger instances
 * @param config Logger configuration
 */
export declare function configureLogger(config: Partial<LoggerConfig>): void;
/**
 * Utility for structured logging
 */
export declare class Logger {
    private context;
    /**
     * Create a new logger instance
     * @param context Context name for this logger
     */
    constructor(context: string);
    /**
     * Log a debug message
     * @param message Log message
     * @param data Optional data to include
     */
    debug(message: string, data?: any): void;
    /**
     * Log an info message
     * @param message Log message
     * @param data Optional data to include
     */
    info(message: string, data?: any): void;
    /**
     * Log a warning message
     * @param message Log message
     * @param data Optional data to include
     */
    warn(message: string, data?: any): void;
    /**
     * Log an error message
     * @param message Log message
     * @param error Optional error to include
     * @param data Optional data to include
     */
    error(message: string, error?: any, data?: any): void;
    /**
     * Create a new logger with a child context
     * @param childContext Additional context to append
     */
    createChildLogger(childContext: string): Logger;
    /**
     * Log a message at the specified level
     * @param level Log level
     * @param message Log message
     * @param data Optional data to include
     * @param error Optional error to include
     */
    private log;
    /**
     * Determine if the specified level should be logged
     * @param level Log level to check
     */
    private shouldLog;
    /**
     * Log to console
     * @param entry Log entry
     */
    private logToConsole;
    /**
     * Log to metrics system (placeholder for actual implementation)
     * @param entry Log entry
     */
    private logToMetrics;
}
