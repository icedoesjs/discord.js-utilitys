<h1 align="center">discord.js-utilitys</h1>
<br></br>

## 📃 | Usage
```js
const { Client } = require('discord.js');
const utils = require(`discord.js-utilitys`);
const client = new Client();
// You can use this method or simply use it as a constructor
client.utils = new utils(client);
```

## 🤖 | Functions
* <utils>.awaitResponse - Await a response from the message author (awaitMessage())
* <utils>.awaitMention - Await a mention from the message author (awaitMessage())
* <utils>.awaitEmoji - Wait for a message reaction from the message author (awaitReactions())
* <utils>.awaitEmojis - Lists emojis on a message and wait for the message author to return one (awaitReactions())
* <utils>.checkPermission - Check if a user has a specified built-in permission (member.hasPermission())
* <utils>.checkPermissionFor - Check if a user has a specified built-in permission in a channel (member.perms.has())
* <utils>.delThis - Send a message and it will delete within the specified time frame (message.delete())
* <utils>.checkRole - Check if a user has a role (member.roles.cache.find())
* <utils>.randomNum - Return a random number
* <utils>.playFile - Play a sound file in the user's voice channel
* <utils>.capitalize - Input a string and get the string back with the first letter capitalized
### 📖 | Function Parameters
* <utils>.awaitResponse(message, STRING|JSON, number, boolean)
* <utils>.awaitMention(message, STRING|JSON, number, boolean)
* <utils>.awaitEmoji(message, STRING|JSON, number, boolean)
* <utils>.awaitEmojis(message, STRING|JSON, array, number, boolean)
* <utils>.checkPermission(message, STRING, STRING|JSON, boolean)
* <utils>.checkPermissionFor(message, STRING, STRING, STRING|JSON, boolean)
* <utils>.delThis(message, STRING|JSON, number, boolean)
* <utils>.checkRole(member, STRING)
* <utils>.playFile(channel, file)
* <utils>.capitalize(STRING)
### 📧 | Using Embeds
```js
// All functions that have a content input are given embeds the same way
var embed = {
    title: "Pick an emoji"
    color: "RED"
    description: "choose a reaction"
};
var emojis = ["😎", "😴"];
utils.awaitEmojis(message, embed, emojis, 50000, true);
// The final boolean is enabling the function to use an embed with the inputed arguements
```

## 📦 | Dependencies 
* [Discord.js](https://npmjs.com/package/discord.js)
* [FFMPEG-static](https://npmjs.com/package/ffmpeg-static)

## 📂 | Examples
All examples are found in [examples.js](https://github.com/iceyym8/discord.js-utilitys/blob/main/examples.js

## 📫 | Contact 
* [Discord](https://discord.gg/37a6wEh8t7)
* [Github](https://github.com/iceyym8)
* [Website](https://iceyym8.dev)

Made with ❤ by [IceyyM8](https://iceyym8.dev)
