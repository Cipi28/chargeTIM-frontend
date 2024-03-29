import 'whatwg-fetch';
import isUndefined from 'lodash/isUndefined';
import {
  partial,
  get as _get,
  forEach,
  cloneDeep,
  groupBy,
  mapValues,
  isNil,
} from 'lodash';
import { saveAs } from 'file-saver';
import {
  // apiDataValid,
  // formatError,
  errorMessages,
} from 'components/Utils';
import { store } from '../store';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  /**
   * Here we parse the JSON data and create a new promise.
   * If status code >= 400 (case in which a client error(validation) occurred)
   *   we reject the new promise, but not before adding the response to the exception
   * Else we just let the promise pass through to the new handlers
   */
  return response.json().then(
    data =>
      new Promise((resolve, reject) => {
        if (response.status >= 400) {
          const newData = cloneDeep(data);
          if (response.status === 422) {
            const startRow = 1;
            const receivedMessages = _get(data, 'data.messages');
            newData.messages = [];
            forEach(receivedMessages, (values, key) => {
              values.map(value => {
                if (/\d/.test(key)) {
                  const trimmedKey = key.replace(/\./g, '');
                  const errorField = trimmedKey.split(/\d/)[
                    trimmedKey.split(/\d/).length - 1
                  ];
                  let number = parseInt(trimmedKey.match(/\d/).join(''));

                  if (_get(errorMessages, [errorField, value])) {
                    newData.messages.push({
                      row: ++number + startRow,
                      error: _get(errorMessages, [errorField, value]),
                    });
                  }
                } else if (_get(errorMessages, [key, value])) {
                  newData.messages.push({
                    row: key,
                    error: _get(errorMessages, [key, value]),
                  });
                }
                return value;
              });
            });

            const errors = groupBy(newData.messages, 'row');
            newData.messages = mapValues(errors, x => x.map(y => y.error));
          }
        reject({ //eslint-disable-line
            response: newData,
            httpCode: response.status,
            recoverable: true,
            message: response.statusText,
          });
        } else {
          resolve(data);
        }
      }),
  );
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 *
 * @todo: review 4xx methods response body not being sent to exception
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 500) {
    if (response.status === 401) {
      window.location.href = '/login';
    }
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  error.recoverable = false;
  throw error;
}

/**
 * Checks if the data.meta code corresponds with the expected code
 * If not throws error
 *
 * @param {string} code Expected resource code
 * @param {object} response server response
 * @returns {object}
 * @throws Error
 */

// todo: see if this is still needed
function checkCode(code, response) {
  if (code) {
    // if (!apiDataValid(response, code)) {
    //   const message = formatError(response, code);
    //   const error = new Error(message.message);
    //   error.response = response;
    //   throw error;
    // }
  }

  return response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {

  // todo: see if this is still needed
  // const {
  //   app: { user },
  // } = store.getState();
  // if (user && user.token) {
  //   if (isUndefined(options.headers.Authorization)) {
  //     // allow custom authorizations also
  //     options.headers.Authorization = `Bearer ${user.token}`;
  //   }
  // }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(partial(checkCode, options.code));
}

export const API_URL = '//localhost:8000/api/v1';

const API_URL_SUBDOM = [
  API_URL,
  process.env.API_URL_1,
  process.env.API_URL_2,
  process.env.API_URL_3,
  process.env.API_URL_4,
  process.env.API_URL_5,
  process.env.API_URL_6,
  process.env.API_URL_7,
  process.env.API_URL_8,
];

export const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'fetch',
};

function getUrl(url, options) {
  if (options.fullUrl) {
    return url;
  }

  // if (!isNil(options.index)) {
  //   return API_URL_SUBDOM[options.index] + url;
  // }

  return API_URL + url;
}

export function get(url, options = {}) {
  return request(getUrl(url, options), {
    mode: 'no-cors',
    code: options.code,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
    ...options,
  });
}

export function download(url, name, options = {}) {
  const {
    app: { user },
  } = store.getState();
  url = options.fullUrl ? url : API_URL + url;
  options = {
    headers: {
      ...defaultHeaders,
      ...(options.headers || {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${name}"`,
      }),
    },
    responseType: 'blob',
    ...options,
  };

  if (user && user.token) {
    if (isUndefined(options.headers.Authorization)) {
      // allow custom authorizations also
      options.headers.Authorization = `Bearer ${user.token}`;
    }
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(response => response.blob())
    .then(blob => saveAs(blob, name));
}

export function post(url, data, options = {}) {
  return request(getUrl(url, options), {
    headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'fetch', },
    method: 'POST',
    code: options.code,
    body: options.raw ? data : JSON.stringify(data),
    ...options,
  });
}

export function del(url, data, options = {}) {
  return request(
    API_URL + url,
    {
      headers: { ...defaultHeaders, ...(options.headers || {}) },
      method: 'DELETE',
      code: options.code,
      body: JSON.stringify(data),
    },
    options,
  );
}

export function patch(url, data, options = {}) {
  return request(
    API_URL + url,
    {
      headers: { ...defaultHeaders, ...(options.headers || {}) },
      method: 'PATCH',
      code: options.code,
      body: JSON.stringify(data),
    },
    options,
  );
}

export default {
  get,
  post,
  del,
  patch,
  download,
  API_URL,
};
