# emote-combo-display


## How it works

The emote-combo-display is a browser source addon for OBS that will show an emote and play a sound when an emote is used enough within a certain time frame in a twitch.tv chatroom. Recommended settings are 5-10 emote uses from UNIQUE individuals within 30 seconds. These settings can be tweaked in the settings.js file.


## How to set up

* First step is to clone/download the repository.
* You will need to create a "sounds" directory. These need to be placed in the main project directory. Make sure that any audio you use is normalized (All the same volume) otherwise some emotes will be louder/softer than others.
* After you set up the directories, you will need to create a settings.js file and place it in the main project directory. This will contain all of the information needed to connect to chat, bttv, and ffz apis. The format for settings.js is in its own section down below.


## settings.js

Here is the format of settings.js:

```
var cooldown_seconds = 30;
var combo_time_window_seconds = 30;
var target_combo = 5;

var channel = "CHANNEL YOU WANT TO CONNECT TO HERE";
var bot_name = "YOUR IRC BOT'S TWITCH USER NAME HERE";
var password = "oauth:YOUR TWITCH OAUTH FOR YOUR BOT HERE";

var cooldown = cooldown_seconds * 1000;
var combo_time_window = combo_time_window_seconds * 1000;
```
**NOTE:** Channel and bot names are in lowercase. Don't use uppercase characters, or you will fail to connect to the chatroom.


## emote_list.js

When you have your settings.js file set up, you will need to add combos to and emote_list.js file. The format of emotes.js is below:

```
var emotes = [
    new Combo(["EMOTECODE1"], ["./sounds/EMOTECODE1.mp3", "./sounds/ANOTHER_SOUND.mp3"]), //two sound files
    new Combo(["EMOTECODE2", "EMOTECODE3"], ["./sounds/EMOTECODE2.mp3"])]; //two emote codes
```


#### Multiple Codes and Sound Files
 The first combo has two sound files and one emote code. The second combo has two emote codes and one sound file. You can have multiple emote codes work towards the same combo, and multiple sounds for that combo. Sounds are chosen at random when a combo completes, and the emote that completes the combo is what is displayed on screen.

#### Choosing Emote Codes
You can use the bttv and ffz emotes that you added to your channel. You can also use emotes from twitch global, bttv global, and ffz global sets for combos. Subscriber emotes and twitch prime emotes are not available at the moment. 


## Adding to OBS
* Once the files are set up it's time to add the emote-combo-display to OBS.
* Start by adding a browser source to your scene in OBS.
* Check off the option for "Local file" in the browser source proporties.
* Click "Browse" and select the index.html file.
* Make sure to set the Width to around 600px. (This is for really wide ffz emotes)
* Set the height to 125px.
* After that you can drag the browser wherever you want the face to display on screen.


## Things to note
* Any time you update your emote list, make sure to click "Refresh cache of current page" in the settings of your browser source on OBS.

* If you don't have an oauth password for twitch you can get one [here](https://twitchapps.com/tmi/). Just sign into your bot's twitch account and that website will generate your oauth password for twitch IRC.
