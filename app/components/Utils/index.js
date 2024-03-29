// eslint-disable-next-line no-unused-vars
import React from 'react';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';

export const errorMessages = {
  email: {
    'validation.unique': 'The email address already exists',
    'validation.email': 'The email address is incorrect',
    'validation.required': 'The email field is required',
  },
  firstName: {
    'validation.required': 'The first name field is required',
  },
  lastName: {
    'validation.required': 'The last name field is required',
  },
  language: {
    'validation.required': 'The language field is required',
    'validation.in': 'The language is incorrect',
  },
  gender: {
    'validation.required': 'The gender field is required',
    'validation.in': 'The gender is incorrect',
  },
  profileId: {
    'validation.required': 'The profile field is required',
    'validation.in': 'The profile is incorrect',
    'validation.integer': 'The profile is incorrect',
    'validation.exists': 'The profile does not exist',
  },
  companyId: {
    'validation.required': 'The company field is required',
    'validation.in': 'The company is incorrect',
    'validation.integer': 'The company id is incorrect',
    'validation.exists': 'The company does not exist',
  },
};

export function decodeJWTToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.warn(error);
    return false;
  }
}

// todo: see if this works
export function validateUserData({ token, lastLogin: lastLoginTimestamp }) {
  const DEFAULT_SESSION_EXPIRATION_TIME_SECS = 1 * 60 * 60; // 1 hour
  const lastLogin = moment(lastLoginTimestamp);
  const expirationTime = lastLogin.add(
    DEFAULT_SESSION_EXPIRATION_TIME_SECS,
    'seconds',
  );
  // if (!rememberMe) {
  if (expirationTime < moment()) {
    console.warn('Session Expired');
    return false;
  }
  // }
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
