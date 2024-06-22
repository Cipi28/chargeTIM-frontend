/**
 * The global state selectors
 */

import { initialState } from './reducer';

export const selectGlobal = state => state.global || initialState;

export const selectAppContainer = () => state => state.app;
