'use client';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { mockArticles } from '@/mocks/articles';
import { setArticles } from '@/store/features/articles-slice';
import { AppStore, makeStore } from '@/store/store';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    let savedArticles = [];

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('articles');
      savedArticles = stored ? JSON.parse(stored) : mockArticles;
    }

    storeRef.current = makeStore();
    storeRef.current.dispatch(setArticles(savedArticles));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
