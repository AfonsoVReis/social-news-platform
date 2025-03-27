import { Auth0User, RoleType } from '@/types/user';

export const isAdmin = (user: Auth0User | undefined) =>
  (user && user.roleType?.includes(RoleType.ADMIN)) ?? false;
