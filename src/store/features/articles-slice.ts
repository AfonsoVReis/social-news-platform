import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Article } from '@/types/article';

const initialState: Article[] = [];

const articlesSlice = createSlice({
  initialState,
  name: 'articles',
  reducers: {
    addArticle: (state, action: PayloadAction<Article>) => {
      state.unshift(action.payload);
    },

    removeArticle: (state, action: PayloadAction<string>) =>
      state.filter((article) => article.id !== action.payload),

    setArticles: (_, action: PayloadAction<Article[]>) => action.payload,

    toggleDraftStatus: (state, action: PayloadAction<string>) => {
      const article = state.find((article) => article.id === action.payload);

      if (article) {
        article.isDraft = !article.isDraft;
      }
    },

    updateArticle: (state, action: PayloadAction<Article>) => {
      const index = state.findIndex(
        (article) => article.id === action.payload.id,
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const {
  addArticle,
  removeArticle,
  setArticles,
  toggleDraftStatus,
  updateArticle,
} = articlesSlice.actions;
export default articlesSlice.reducer;
