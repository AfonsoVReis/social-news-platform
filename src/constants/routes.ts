export const routes = {
  createArticle: '/article/create-article',
  editArticle: '/article/',
  feed: '/feed',
  feedArticle: 'feed/article',
  home: '/',
  login: '/api/auth/login?returnTo=/feed',
  logout: '/api/auth/logout?returnTo=/',
};

export const routeRegex = {
  article: /^\/article(\/.*)?$/,
  feed: /^\/feed(\/.*)?$/,
};

export const protectedRoutes = [routeRegex.article, routeRegex.feed];

export const adminRoutes = [routeRegex.article];
