import { configureStore } from '@reduxjs/toolkit';
import middleware from './middleware';
import articlesSlice from './features/articles-slice';

export const makeStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
    reducer: {
      articles: articlesSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
