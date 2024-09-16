/**
 * An array of routes that are accessible to the private
 * These routes require authentication
 * @type {string[]}
 */
export const privateRoutes : string[] = [];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/sign-in",
];

/**
 * The prefix for API authentication routes
 * Routes 
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";