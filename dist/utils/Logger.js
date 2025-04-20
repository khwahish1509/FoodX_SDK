"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.configureLogger = exports.LogLevel = void 0;
/**
 * Log severity levels
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
/**
 * Default logger configuration
 */
const DEFAULT_CONFIG = {
    minLevel: LogLevel.INFO,
    enableConsole: true,
    enableMetrics: false
};
/**
 * Global logger configuration
 */
let globalConfig = { ...DEFAULT_CONFIG };
/**
 * Configure all logger instances
 * @param config Logger configuration
 */
function configureLogger(config) {
    globalConfig = { ...globalConfig, ...config };
}
exports.configureLogger = configureLogger;
/**
 * Utility for structured logging
 */
class Logger {
    /**
     * Create a new logger instance
     * @param context Context name for this logger
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * Log a debug message
     * @param message Log message
     * @param data Optional data to include
     */
    debug(message, data) {
        this.log(LogLevel.DEBUG, message, data);
    }
    /**
     * Log an info message
     * @param message Log message
     * @param data Optional data to include
     */
    info(message, data) {
        this.log(LogLevel.INFO, message, data);
    }
    /**
     * Log a warning message
     * @param message Log message
     * @param data Optional data to include
     */
    warn(message, data) {
        this.log(LogLevel.WARN, message, data);
    }
    /**
     * Log an error message
     * @param message Log message
     * @param error Optional error to include
     * @param data Optional data to include
     */
    error(message, error, data) {
        this.log(LogLevel.ERROR, message, data, error);
    }
    /**
     * Create a new logger with a child context
     * @param childContext Additional context to append
     */
    createChildLogger(childContext) {
        return new Logger(`${this.context}.${childContext}`);
    }
    /**
     * Log a message at the specified level
     * @param level Log level
     * @param message Log message
     * @param data Optional data to include
     * @param error Optional error to include
     */
    log(level, message, data, error) {
        // Skip if level is below minimum level
        if (!this.shouldLog(level)) {
            return;
        }
        const entry = {
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
    shouldLog(level) {
        const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
        const minLevelIndex = levels.indexOf(globalConfig.minLevel);
        const levelIndex = levels.indexOf(level);
        return levelIndex >= minLevelIndex;
    }
    /**
     * Log to console
     * @param entry Log entry
     */
    logToConsole(entry) {
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
    logToMetrics(entry) {
        // This would be implemented to send logs to a metrics/monitoring system
        // For now it's just a placeholder
    }
}
exports.Logger = Logger;
