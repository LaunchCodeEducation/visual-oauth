# Visual OAuth

A tool to learn about OAuth in a step-by-step interactive environment.

# Usage

## clone the repo

- navigate to the directory where you want the repo cloned
- then enter the following into your terminal

```sh
git clone https://github.com/the-vampiire/visual-oauth
```

> you will get the following directory structure

```sh
src/
  README.md
  package.json <-- root scripts to install / setup / run the client and API servers
  api/
    ...api code
  client/
    ...client code
```

## install dependencies

- **run all of the following commands in the root directory of the repo (where the `README.md` is)**
- in your terminal enter:

```sh
# run this from the root directory of the repo
npm run install
```

## create `.env` files

- this will create the `src/api/.env` and `src/client/.env` file templates
- most of the variables will be populated automatically but you will need to enter the GitHub app credentials `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

```sh
# run this from the root directory of the project
npm run env:create
```

## register your own github oauth app

- click your github profile (top right corner) and go to `settings`
- scroll down to `developer settings`
- select `oauth apps`
- select `new oauth app`
- give a name for your app (`YOUR_NAME Visual OAuth`)
- give the `homepage url` and `authorization callback url`
  - `http://localhost:3000/` (this is the default port the tool runs the client on)
- click `register application`
- leave this tab open to copy over the `client_id` and `client_secret` into the `.env` files

## copy over your github app credentials

### client env variables

- in the `src/client/.env` file paste in your `GITHUB_CLIENT_ID` value
  - highlight `REPLACE_WITH_GITHUB_CLIENT_ID` by double clicking it
  - paste in your `client_id` of the registered app
  - **be careful not to replace the preceding `=` or ending `&` characters**

### API env variables

- in the `src/api/.env` file paste in your `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` values

## run the servers

- this will start the API then the react client dev server
- they will both be executed in the same terminal so you won't be able to see API server logs this way
- your browser should open to the client page automatically
  - if it doesn't enter `http://localhost:3000` into your browser manually

```sh
# run this from the root directory of the repo
npm run start
```

## tinker!

- feel free to poke around the code, add logs and make changes to see how it impacts the flow
  - you will want need to run the servers separately (see below) when tinkering
- the react client has a lot of UI components that can be confusing to navigate
  - all of the OAuth related logic is in the `src/client/src/steps/#-StepName.js` files
  - steps 1 and 2 are client-side (front-end)
- the api is simple to navigate and has comments
  - steps 3-5 are server-side (back-end)

# Optional

### running the servers separately (debugging / tinkering)

- this will allow you to edit / debug the code with their own terminals for logs
- **you will need 2 terminal windows open**
- if you are in VSCode hit the `split window` icon (between the `+` and the `trashcan` icons in the terminal)
  - this will create two terminals side by side

### terminal 1: run the API

```sh
# run this from the root directory of the repo
npm run start:api
```

### terminal 2: run the client

```sh
# run this from the root directory of the repo
npm run start:client
```
