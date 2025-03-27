import { adminRoutes, protectedRoutes } from '../constants/routes';

export const isAdminRoute = (pathname: string) =>
  adminRoutes.some((route) =>
    typeof route === 'string' ? route === pathname : route.test(pathname),
  );

export const isProtectedRoute = (pathname: string) =>
  protectedRoutes.some((route) =>
    typeof route === 'string' ? route === pathname : route.test(pathname),
  );
