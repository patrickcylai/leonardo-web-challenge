# Leonardo Web Challenge
This challenge will use the Countries graphql API to display a list of countries that is gated behind Google SSO. Users will have the ability to set up a username and job title in the onboarding flow.

## Prerequisites
Requires a `.env` and `.env.local` to run. This can be setup with the template provided in `.env.local.template` and `.env.template` which shows the required environment variables to get this up and running.

## Setup locally
Running this is done by:

```
nvm use
yarn
```

and finally to run locally:

```
yarn dev
```

## Production
This is running on vercel at https://patrick-leonardo-web-challenge.vercel.app/