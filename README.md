# stayunique-ui

You will need to make a personal access token with scope packages:read, packages:write and repo (use the token instead of password while logging in)

https://www.chromatic.com/library?appId=6118f094759b17003c6a661d

## How to publish

-   Update package version etc
-   npm login --registry=https://npm.pkg.github.com
-   yarn run build
-   npm publish --registry=https://npm.pkg.github.com/@stayunique

## How to use

npm login --registry=https://npm.pkg.github.com

In your local project make a .npmrc file in the root and add the following:

@stayunique:registry=https://npm.pkg.github.com

yarn add @stayunique/stayunique-ui

### Vercel deployments

Read this https://vercel.com/support/articles/using-private-dependencies-with-vercel
