/**
 * HarverstIQ - Shared Constants
 */

// API Configuration
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;
export const RATE_LIMIT = {
  WINDOW: '15m',
  MAX_REQUESTS: 100,
};

// JWT Configuration
export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
};

// Google Sheets Configuration
export const SHEETS_CONFIG = {
  BATCH_SIZE: 50,
  WRITE_QUOTA_PER_MIN: 300,
  CACHE_TTL: 60, // seconds
  TABS: {
    RAW_DATA: 'Raw_Data',
    STAGING: 'Staging',
    APPROVED_DATA: 'Approved_Data',
    JOB_LOGS: 'Job_Logs',
    AUDIT_LOGS: 'Audit_Logs',
  },
};

// Database Configuration
export const DB_CONFIG = {
  CONNECTION_TIMEOUT: 5000,
  POOL_SIZE: 10,
};

// Queue Configuration
export const QUEUE_CONFIG = {
  MAX_ATTEMPTS: 3,
  BACKOFF_DELAY: 5000, // 5 seconds
  BACKOFF_FACTOR: 2,
};

// Browser Pool Configuration
export const BROWSER_POOL_CONFIG = {
  MAX_BROWSERS: 5,
  CONTEXT_TTL: 300, // 5 minutes
  PAGE_TIMEOUT: 30000, // 30 seconds
  DEFAULT_VIEWPORT: {
    width: 1280,
    height: 720,
  },
};

// Scraper Configuration
export const SCRAPER_CONFIG = {
  DEFAULT_DELAY_MIN: 1000, // 1 second
  DEFAULT_DELAY_MAX: 5000, // 5 seconds
  CONTENT_MAX_LENGTH: 10000,
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Resource not found',
  INTERNAL_ERROR: 'Internal server error',
  INVALID_INPUT: 'Invalid input data',
  JOB_NOT_FOUND: 'Job not found',
  DATASET_NOT_FOUND: 'Dataset not found',
  TEMPLATE_NOT_FOUND: 'Selector template not found',
  JOB_ALREADY_RUNNING: 'Job is already running',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  GOOGLE_SHEETS_ERROR: 'Google Sheets API error',
  SCRAPER_ERROR: 'Scraper error',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  JOB_CREATED: 'Job created successfully',
  JOB_UPDATED: 'Job updated successfully',
  JOB_DELETED: 'Job deleted successfully',
  JOB_STARTED: 'Job started successfully',
  JOB_STOPPED: 'Job stopped successfully',
  DATASET_APPROVED: 'Dataset approved successfully',
  DATASET_DELETED: 'Dataset deleted successfully',
  TEMPLATE_CREATED: 'Template created successfully',
  TEMPLATE_UPDATED: 'Template updated successfully',
  TEMPLATE_DELETED: 'Template deleted successfully',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1,
};

// Validation Patterns
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  CRON: /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/,
};
