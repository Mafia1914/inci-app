export const API_BASE_URL = "http://54.253.23.158:3000";

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export const LOGIN = getApiUrl('/api/auth/login');

export const SIGNUP = getApiUrl('/api/auth/register');

export const FORGETPASSWORD = getApiUrl('/api/auth/forgot-password');

export const VERIFYOPT= getApiUrl('/api/auth/verify-otp');

export const RESETPASSWORD = getApiUrl('/api/auth/reset-password');

export const PROFILE = getApiUrl('/api/auth/me');


export const PROFILE_UPDATE = getApiUrl('/api/auth/me');


