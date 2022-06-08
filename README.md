<div align="center">
  <img align="center" src="https://github.com/tonymoooon543/Archiver-Bot/blob/master/images/archiver-logo.png">
</div>

<br>

[![license](https://img.shields.io/badge/license-JBPL--NO%201.0-brightgreen)](https://github.com/JBStepan/Archiver-Bot/blob/master/LICENSE.txt)

[![forthebadge](https://forthebadge.com/images/badges/mom-made-pizza-rolls.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/compatibility-betamax.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://img.shields.io/github/languages/code-size/JBStepan/Archiver-Bot?style=for-the-badge)](https://forthebadge.com)


# Discord Archiver Bot
A bot the will archive the messages sent in your Discord server 
<br>

## Running yourself
Requirements:
  - NodeJS
1. Download the code.
2. Navigate to where you downloaded it and in the console run `npm install`.
3. Create a Firebase project at [Firebase.com](https://www.firebase.com).
4. Add a web app to the project.
5. Create a file named `config.json` in the base directory.
6. Put this structure in there and replace with firebase info:
```json
{
    "token": "DISCORD_TOKEN",
    "client_id": "DISCORD_CLIENT_ID",
    "debug_guild": "DEBUG_GUILD_FOR_TESTING",
    "command_dir": "COMMAND_DIRECTORY",
    "debug": false,
    "firebase_api-key": "FIREBASE_API_KEY",
    "firebase_auth-domain": "FIREBASE_AUTH_DOMAIN",
    "firbase_project-id": "FIREBASE_PROJECT_ID",
}
```
7. In the console, run `npm run prod`
### !! If this does not work please open an issue. !!

## Bugs and proposed features
If you run into a bug please open an bug issue.

If you want to add a feature to Archiver, please open a discussion in `Ideas` in Discussions before opening a pull request.
This is so we can talk about what the feature is and what it intails before open a pull request.

## Links
[Design Doc](https://github.com/tonymoooon543/Archiver-Bot/blob/master/DESIGN.md)
<br>
Discord - *coming sooner or later*
