import { UserProfile } from '@auth0/nextjs-auth0/client';

export enum RoleType {
  ADMIN = 'admin',
  DEFAULT = 'default',
}

export interface Auth0User extends UserProfile {
  roleType?: RoleType[];
}
