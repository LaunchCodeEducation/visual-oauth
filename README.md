# Visual OAuth

A tool to learn about OAuth in a step-by-step interactive environment.

# Usage

1. clone this application repo
2. create a GitHub OAuth Application
3. set up the application
4. run the application
5. view in browser and begin learning!

## clone the repo

```sh
# clone into current directory
$ git clone https://github.com/LaunchCodeEducation/visual-oauth

# optionally give a clone path as the second argument
$ git clone https://github.com/LaunchCodeEducation/visual-oauth /path/to/cloned/repo
```

> creates the following directory structure

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
- give a name for your app: `YOUR_NAME Visual OAuth`
- for homepage url enter: `http://localhost:3000/`
- for authorization callback url enter: `http://localhost:3000/`
- click `register application`

> **leave this tab open to copy over the Client ID and Secret in the next step**

## set up the application

```sh
# run this from the root directory of the repo
$ npm run setup

# you will be prompted for [GitHub Client ID] and [GitHub Client Secret] from when you registered your GitHub oauth app
```

## run the app

```sh
# run this from the root directory of the repo
$ npm run start
```

> **it may take up to 30 seconds for the application to start up**

> if your browser doesn't open automatically click this link http://localhost:3000

> you can stop the app using `ctrl+C` in the terminal
