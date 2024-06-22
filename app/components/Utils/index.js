// eslint-disable-next-line no-unused-vars
import React from 'react';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';

export function decodeJWTToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.warn(error);
    return false;
  }
}

export function validateUserData({ token, lastLogin: lastLoginTimestamp }) {
  const DEFAULT_SESSION_EXPIRATION_TIME_SECS = 1 * 60 * 60; // 1 hour
  const lastLogin = moment(lastLoginTimestamp);
  const expirationTime = lastLogin.add(
    DEFAULT_SESSION_EXPIRATION_TIME_SECS,
    'seconds',
  );
  if (expirationTime < moment()) {
    console.warn('Session Expired');
    return false;
  }
  if (!token) {
    return false;
  }
  const decodedToken = decodeJWTToken(token);
  if (!decodedToken) {
    return false;
  }

  const { sub: userId, exp } = decodedToken;
  const expirationDate = moment.unix(exp);

  if (expirationDate < moment()) {
    console.warn('Token Expired');
    return false;
  }

  return {
    token,
    userId,
    expirationDate,
  };
}
