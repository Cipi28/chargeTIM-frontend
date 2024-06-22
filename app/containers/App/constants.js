/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const STORE_USER = 'APPCONTAINER/STORE_USER';
export const USER = 'APPCONTAINER/USER';
export const LOAD_DATA_SUCCESS = 'APPCONTAINER/LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'APPCONTAINER/LOAD_DATA_FAILURE';
export const LOAD_USER = 'APPCONTAINER/LOAD_USER';

export const LOCALSTORAGE_KEY = 'USER_DATA';
