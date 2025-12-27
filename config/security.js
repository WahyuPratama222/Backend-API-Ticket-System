// config/security.js

/**
 * Helmet Configuration
 * Security headers for production
 */
export const helmetOptions = {
  contentSecurityPolicy: false, // Disable CSP untuk API (kalau butuh, enable di sini)
  crossOriginEmbedderPolicy: false, // Disable untuk API
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin requests
};

/**
 * Express JSON Parser Options
 */
export const jsonParserOptions = {
  limit: "10mb", // Limit request body size
};

/**
 * Express URL Encoded Parser Options
 */
export const urlEncodedOptions = {
  extended: true,
  limit: "10mb",
};