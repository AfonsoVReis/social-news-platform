'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Edit } from '@mui/icons-material';
import { Avatar, ButtonBase, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { MouseEvent, useMemo, useState } from 'react';
import { IconButton } from '@/components/icon-button';
import { Typography } from '@/components/typography';
import { Button } from '@/components/button';
import { routes } from '@/constants/routes';
import { isAdmin } from '@/utils/users';
import styles from './user-session.module.css';

export const UserSession = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const { isLoading, user } = useUser();
  const router = useRouter();

  const isUserAdmin = useMemo(() => isAdmin(user), [user]);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) =>
    setMenuAnchor(event.currentTarget);

  const handleCloseUserMenu = () => setMenuAnchor(null);

  const handleMenuItemClick = (route: string) => {
    handleCloseUserMenu();

    router.push(route);
  };

  if (isLoading) {
    return;
  }

  return (
    <div className={styles.content}>
      {!!user ? (
        <div className={styles.authenticated}>
          {isUserAdmin && (
            <IconButton onClick={() => router.push(routes.createArticle)}>
              <Edit color="secondary" />
            </IconButton>
          )}

          <ButtonBase
            className={styles.profileHolder}
            onClick={handleOpenUserMenu}
          >
            <Avatar src={user.picture || undefined} />

            <Typography color="var(--secondary)" variant="body2">
              {user.name}
            </Typography>
          </ButtonBase>

          <Menu
            anchorEl={menuAnchor}
            id="menu-avatar"
            onClose={handleCloseUserMenu}
            open={Boolean(menuAnchor)}
          >
            <MenuItem onClick={() => handleMenuItemClick(routes.logout)}>
              <Typography>Logout</Typography>
            </MenuItem>

            {isUserAdmin && (
              <MenuItem
                onClick={() => handleMenuItemClick(routes.createArticle)}
              >
                <Typography>Create a new article</Typography>
              </MenuItem>
            )}
          </Menu>
        </div>
      ) : (
        <Button href={routes.login} variant="secondary">
          Login
        </Button>
      )}
    </div>
  );
};
