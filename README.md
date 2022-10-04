# Jump_Bot

Discord Bot to keep track of Jump Voyage's current projects.

Thanks to all of those who helped create this bot! You know who you are.

This repo is meant to be used as a template. Originally it connected to an API I created. That API will no longer work. If you are going to use an API for basic JSON data you can use https://mockapi.io/ for free. You will need to update the endpoints in the index.js file.

After cloning the repo cd into the jump_bot folder and in the terminal run npm i to install the required modules.

I have excluded my .env and config.json files from this repo. If you try to run the bot as is, you will have errors.

You will need to create a .env file and then add your bot token into it. Example below.

token=yourdiscordbottoken

Next you will need to create a file called config.json and you will need to add your guild id, client id, and token into json format in that file. example below.

{
"clientId": "your client id",
"guildId": "your guild id",
"token": "your bot token"
}

If you are seeing this text the code is not complete for all 3 endpoints.
