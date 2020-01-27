# Tinker!

> feel free to poke around the code, add logs and make changes to see how it impacts the flow

- API logs are visible in the terminal
- client logs are visible in the developer tools console tab in the browser
- you will need to run the servers separately (see below) when tinkering

> the react client has a lot of UI components that can be confusing to navigate

- all of the OAuth related logic is in the `src/client/src/steps/#-StepName.js` files
- steps 1 and 2 take place client-side (front-end, client directory)

> the api is simple to navigate and has comments

- steps 3-5 take place server-side (back-end, API directory)

# Optional

### running the servers separately (debugging / tinkering)

- this will allow you to edit / debug the code with their own terminals for logs
- **you will need 2 terminal windows open**
- if you are in VSCode hit the `split window` icon (between the `+` and the `trashcan` icons in the terminal)
  - this will create two terminals side by side

> if the app is currently running make sure to stop it first using `ctrl+C`

### terminal 1: run the API

```sh
# run this from the root directory of the repo
$ npm run start:api
```

### terminal 2: run the client

```sh
# run this from the root directory of the repo
$ npm run start:client
```
