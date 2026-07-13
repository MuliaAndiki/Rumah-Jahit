export const APP_SESSION_COOKIE_KEY = "rjahit_session";
export const APP_SESSION_COOKIE_REFRESH = "rjahit_refres";
export const APP_SESSION_COOKIE_ROLE = "rjahit_role";
export const APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN = 24 * 60 * 60 * 1000;

export const AUTH_COOKIE_MAX_AGE = {
  accessToken: 60 * 60 * 24 * 7, // 7 days in seconds
  refreshToken: 60 * 60 * 24 * 30, // 30 days in seconds
  role: 60 * 60 * 24 * 30, // 30 days in seconds
} as const;
