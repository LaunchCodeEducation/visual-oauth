# Visual OAuth

A tool to learn about OAuth in a step-by-step interactive environment.

# Usage

1. clone the application
2. get GitHub OAuth application credentials
3. set up the application
4. run the application
5. view in browser and begin learning!

## clone the repo

```sh
# clone into current directory
$ git clone https://github.com/the-vampiire/visual-oauth

# optionally give a clone path as the second argument
$ git clone https://github.com/the-vampiire/visual-oauth /path/to/cloned/repo
```

> you will get the following directory structure

```sh
visual-oauth/
  README.md
  package.json <-- root scripts to setup / run the client and API servers
  api/
    ...api code
  client/
    ...client code
```

## register your own github oauth app

> create a GitHub OAuth App to get your Client ID and Secret

- click your github profile (top right corner) and go to `settings`
- scroll down to `developer settings` in the sidebar
- select `oauth apps`
- select `new oauth app`
- give a name for your app (`YOUR_NAME Visual OAuth`)
- for homepage url enter: `http://localhost:3000/`
- for authorization callback url enter: `http://localhost:3000/`
- click `register application`

> leave this tab open to copy over the `client_id` and `client_secret` in the next step

## set up the application

> **run the following command in the root directory of the repo (where the `README.md` is)**

```sh
# run this from the root directory of the repo
$ npm run setup
```

## run the app

> **run the following command in the root directory of the repo (where the `README.md` is)**

```sh
# run this from the root directory of the repo
$ npm run start
```

> if it doesn't enter `http://localhost:3000` into your browser manually your browser should open to the client page automatically

> you can stop the app using `ctrl+C` in the terminal
