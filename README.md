# Social News Platform

### Setup

After cloning the project please add the following values to an `.env.local` file on the **root of the project**.

```
AUTH0_SECRET='aef0f0e52e6e3e9238d5d4cb217ec7daa40ceeaf7f2f878a9a70ab0b92950565'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://dev-aehbj4wemjhvhg40.us.auth0.com'
AUTH0_CLIENT_ID='YKk9UDUk5b39yWx1I3JvNL8dZ1gKeVIa'
AUTH0_CLIENT_SECRET='TGFQW5ug95ms96UY7FrdTbC6IOQZKhVZTr7WPwFfc8QRnld2Jh-5-MSD1Wfhnzx-'
```

Install dependencies

`$ npm i`

Run locally

`$ npm run dev`

You should be all set.

### App authentication

The app uses [auth0](https://auth0.com/) to handle authentication. You can login/signup with the default username/password setting or using an SSO provider (such as Google or GitHub).

If you want to login as a **platform admin** please use:

```
username: feed-admin@admin.com
password: 1Password!123
```

With an `admin` user you will be able to **add / remove / edit / draft** an article.

With an `default` role user you will be able to see articles.

## Stack

### NextJS

This project is built using [App Router](https://nextjs.org/docs/app) which replaces the previous `Pages router`. As a result:

- the `src/app` contains all the routing pages.
- `getServerSideProps` and `getStaticProps` were dropped in favour of `server components` and `server functions`.

### Redux

While it may seem overkill to use `Redux` it seems relevant to showcase the setup.

The project follows the standard setup for `Redux` with minimal configuration.

Considerations:

- each dispatch to the store is intercepted by a `middleware` that saves the store state into `localStorage` persisting the data.
- the app purposely does not check the user session prior to populating `localStorage`, because it's assumed that the user may log out and login again while still having some data persisted.
- Please note that because the app is using `localStorage` we are not fully leveraging SSR features.

If you want to reset / reload the mocked data into the initial state you should clear the key `articles` in your browsers `localStorage`.

### UI components and styling

The app uses [Material UI](https://mui.com/material-ui/all-components/) to leverage and speedup the integration.

`CSS modules` is used for styling.

`MUI theme variables` were injected into `global.css` to leverage the use of vars for `CSS modules` customization.

Considerations:

- `CSS modules` usage could be mostly replaced by `Material UI` + `Emotion` `sx` prop, but i think it was important to showcase CSS usage.
- Most `Material UI` components are being encapsulated to leverage styling with `CSS modules` instead of directly manipulating the `MUI` components.
- The app uses [clsx](https://www.npmjs.com/package/clsx) to merge `classNames` and apply variants if applicable.

## Code base linting and formatting

The project includes some light linting and formatting to ensure code base integrity.

- `ESlint`
- `Prettier`
- `Stylelint`
- `Commitlint`

## Tests

The project includes basic testing for some utility functions using `Jest`.
