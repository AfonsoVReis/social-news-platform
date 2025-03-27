import { Middleware } from '@reduxjs/toolkit';
import { updateLocalStorage } from '@/utils/local-storage';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof window !== 'undefined' && window.localStorage) {
    const state = store.getState().articles;

    updateLocalStorage(state);
  }

  return result;
};

export default localStorageMiddleware;
