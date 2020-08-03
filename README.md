# Visual OAuth

A tool to learn about OAuth in a step-by-step interactive environment.

# Usage

1. clone this application repo
2. create a GitHub OAuth Application
3. set up the application
4. run the application
5. view in browser and begin learning!

## Clone the repo

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

## Register your own GitHub OAuth app

> create a GitHub OAuth App to get your Client ID and Secret

- click your github profile (top right corner) and go to `settings`
- scroll down to `developer settings` in the sidebar
- select `oauth apps`
- select `new oauth app`
- give a name for your app: `YOUR_NAME Visual OAuth`
- for homepage url enter: `http://localhost:3000/`
- for authorization callback url enter: `http://localhost:3000/`
- click `register application`

> **leave this tab open to copy over the Client ID and Secret when prompted in the next step**

## Set Up Visual OAuth

### Linux and MacOS

```sh
# run this from the root directory of the repo
$ npm run setup

# you will be prompted for [GitHub Client ID] and [GitHub Client Secret] from when you registered your GitHub oauth app
```

### Windows

```powershell
# run this from the root directory of the repo
> npm run setup:windows

# you will be prompted for [GitHub Client ID] and [GitHub Client Secret] from when you registered your GitHub oauth app
```

## Run Visual OAuth

The client startup script will automatically open your default browser to `http://localhost:3000` after it is done loading.

> NOTE: **it may take up to 30 seconds for the client application to start up**

If your browser doesn't open automatically click this link http://localhost:3000

> you can stop the app using `ctrl+C` in the terminal

### Linux and MacOS

```sh
# run this from the root directory of the repo
$ npm run start
```

### Windows

In Windows **you will need to start both** the API and Client separately in **two different** PowerShell terminals.

In your first PowerShell terminal:

```powershell
# run this from the root directory of the repo
> npm run start:api
```

In your second PowerShell terminal:

```powershell
# run this from the root directory of the repo
> npm run start:client
```

#### WARNING: Windows Browsers

This example will **not work in Microsoft Edge, or Microsoft Internet Explorer**.

If Edge, or IE are your default browser you will need to open a legitimate browser [like Firefox](https://firefox.com) and manually navigate to http://localhost:3000.
