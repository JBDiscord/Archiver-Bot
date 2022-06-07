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
1. Create a Firebase project at [Firebase.com](https://www.firebase.com)
2. Add a web app to the project
3. Create a file name `config.json` in the base directory.
3. Put this structure in there and replace with firebase info
```json
{
    "token": "DISCORD_TOKEN",
    "client_id": "DISCORD_CLIENT_ID",
    "debug_guild": "DEBUG_GUILD_FOR_TESTING",
    "command_dir": "COMMAAND_DIRECTORY",
    "debug": false,
    "firebase_api-key": "FIREBASE_API_KEY",
    "firebase_auth-domain": "FIREBASE_AUTH_DOMAIN",
    "firbase_project-id": "FIREBASE_PROJECT_ID",
}
```
4. Run `npm run prod`

[Design Doc](https://github.com/tonymoooon543/Archiver-Bot/blob/master/DESIGN.md)
<br>
Discord - *coming sooner or later*
