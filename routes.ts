/**
 * An array of routes that rae accessible to 
 * public. These routes do not require 
 * authentication
 * @type {string[]}
*/
export const publicRoutes: string[] = [
    "/"
]


/**
 * An array of routes that are used for 
 * authentication. These routes will rdirect users 
 * to settings
 * @type {string[]}
*/
export const authRoutes: string[] = [
    "/auth/signin",
    "/auth/signup"
]


/**
 * The prefix for api authentication routes
 * Routes that start with this prefix are used for * API authentication purposes
 * @type {string}
*/
export const apiAuthPrefix: string = "/api/auth"


/**
 * The default redirect path after logging in.
 * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT: string = "/settings"