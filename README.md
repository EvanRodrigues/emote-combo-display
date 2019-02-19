# emote-combo-display


### How it works

The emote-combo-display is a browser source addon for OBS that will show an emote and play a sound when an emote is used enough within a certain time frame in a twitch.tv chatroom. Default settings are 10 emote uses from UNIQUE individuals within 20 seconds. These settings can be tweaked in the tools.js file.


### How to set up

* First step is to clone/download the repository.
* You will need to create an "art" directory and a "sounds" directory. These need to be placed in the main project directory. Make sure that any audio you use is normalized (All the same volume) otherwise some emotes will be louder/softer than others. Also, make sure the emotes you use are SQUARE (same dimensions) otherwise the emote will be distorted when it is shown on screen.
* After you set up the directories, you will need to create a settings.js file and place it in the main project directory. This will contain all of the information needed to connect to chat and what emotes the bot is tracking. The format for settings.js is in its own section down below.


### Adding to OBS
* Once the files are set up it's time to add the emote-combo-display to OBS.
* Start by adding a browser source to your scene in OBS.
* Check off the option for "Local file" in the browser source proporties.
* Click "Browse" and select the index.html file.
* Make sure to set the Width and Height of the browser source to 125.
* After that you can drag the browser wherever you want the face to display on screen.

### settings.js

Here is the format of settings.js:

```
var channel = "CHANNEL YOU WANT TO CONNECT TO HERE";
var bot_name = "YOUR IRC BOT'S TWITCH USER NAME HERE";
var password = "oauth:YOUR TWITCH OAUTH FOR YOUR BOT HERE";
var emotes = [new Emote("EMOTECODE1", "./art/EMOTECODE1.jpg", "./sounds/EMOTECODE1.mp3"), new Emote("EMOTECODE2", "./art/EMOTECODE2.jpg", "./sounds/EMOTECODE2.mp3")];
```

If you don't have an oauth password for twitch you can get one [here](https://twitchapps.com/tmi/). Just sign into your bot and that website will generate your oauth password for twitch IRC.

You can add as many emote objects to the emote array.

NOTE: Channel and bot names are in lowercase. Don't use uppercase, or you will fail to connect to the chatroom.
