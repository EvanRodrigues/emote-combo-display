var cooldown_active = false;

//Initialize emotes
let all_emotes = new Array();
let ffz_emotes, ffz_global, bttv_emotes, bttv_global;
GetFfzEmotes(channel);
GetBttvEmotes(channel);


//BTTV format for image and gif urls
function BttvEmoteURL(id) {
    return "cdn.betterttv.net/emote/" + id + "/3x";
}

//Get id then get emote
async function GetBttvEmotes(channel) {
    const url = "https://api.betterttv.net/2/channels/" + channel;
    const global_url = "https://api.betterttv.net/2/emotes";

    fetch(url)
        .then(response => response.json())
        .then(json => {
            const emotes = json["emotes"];
            bttv_emotes = emotes.map(emote => new Emote(emote["code"], BttvEmoteURL(emote["id"])));
        });

    fetch(global_url)
        .then(response => response.json())
        .then(json => {
            const emotes = json["emotes"];
            bttv_global = emotes.map(emote => new Emote(emote["code"], BttvEmoteURL(emote["id"])));
        });
}

//Gets highest resolution available url for each ffz emote.
function GetResolution(emote) {
    if (emote["urls"][4] != null) return emote["urls"][4];
    else if (emote["urls"][2] != null) return emote["urls"][2];
    else return emote["urls"][1];
}

function GetFfzEmotes(channel) {
    const url = "https://api.frankerfacez.com/v1/room/" + channel;
    const global_url = "https://api.frankerfacez.com/v1/set/global";

    fetch(url)
        .then(response => response.json())
        .then(json => {
            const id = json["room"]["set"];
            const emotes = json["sets"][id]["emoticons"];
            ffz_emotes = emotes.map(emote => new Emote(emote["name"], GetResolution(emote)));
        });

    fetch(global_url)
        .then(response => response.json())
        .then(json => {
            const set_id = json["default_sets"][0];
            const emotes = json["sets"][set_id]["emoticons"];
            ffz_global = emotes.map(emote => new Emote(emote["name"], GetResolution(emote)));
        });
}


/*
 * Resets the combo to default values.
 */
function reset_combo(emote) {
    emote.combo = 0;
    emote.users = [];
    emote.timer = null;
}

/*
 * Plays an mp3 file.
 * Input: The path to the audio file.
 */
function play_audio(audio_file) {
    var audio = document.createElement("audio");

    audio.src = audio_file;
    audio.onloadedmetadata = function () {
        var duration = Math.floor(audio.duration * 1000);

        audio.volume = 1;
        audio.play();

        hide_emote(duration);
        start_cooldown();
    };
}

/*
 * After a combo has been achieved, a cooldown is activated.
 * While the cooldown is activated, no checking for combos.
 */
function start_cooldown() {
    cooldown_active = true;
    setTimeout(function () {
        cooldown_active = false;
    }, cooldown);
}

/*
 * Picks a file from an array of song file paths to play.
 */
function pick_audio(audio_list) {
    audio_length = audio_list.length;
    var random_index = Math.floor(Math.random() * audio_length);
    return audio_list[random_index];
}

/*
 * Displays the emote and plays audio.
 * After sound is played, emote gets removed from display.
 */
function show_emote(emote, code_index) {
    console.log(all_emotes[2]);
    const target_emote = all_emotes.filter(e => e.codes == emote.codes[code_index]);
    console.log(target_emote);


    $("#emote").attr("src", "https:" + target_emote[0].art);

    //$("#emote").attr("src", emote.art[code_index]);
    $("#emote").fadeIn(500);
    play_audio(pick_audio(emote.audio));
}

/*
 * Fades emote out of display after 5 seconds.
 */
function hide_emote(display_time) {
    setTimeout(function () {
        $("#emote").fadeOut(500);
    }, display_time);
}

/*
 * Starts the timing window for the current emote to be combo'd.
 */
function start_timer(emote) {
    return setTimeout(function () {
        console.log(emote.codes + " timer stopped");
        timer_started = false;
        reset_combo(emote);
    }, combo_time_window);
}

/*
 * Updates the global variables that keep track of the emote combo.
 */
function update_combo(emote, username, code_index) {
    //Combo started.
    if (emote.timer == null) {
        emote.combo = 1;
        emote.users = [username];
        emote.timer = start_timer(emote);
    }
    //Combo continuing
    else {
        emote.combo++;
        emote.users.push(username);

        //Combo achieved! Show face, play audio, and reset emote combo.
        if (emote.combo == target_combo) {
            show_emote(emote, code_index);
            reset_combo(emote);
        }
    }

    console.log("emote: " + emote.codes);
    console.log("combo: " + emote.combo);
    console.log("users: " + emote.users);
}

/*
 * Parses through the emote.codes array to see if the word matches an emote code.
 */
function word_in_codes(word, codes) {
    for (count = 0; count < codes.length; count++) {
        if (word === codes[count]) {
            return count;
        }
    }

    return -1;
}

/*
 * Finds the first occurrence of any target emote.
 */
function contains_target_emote(message, username) {
    if (cooldown_active == true) {
        return;
    }

    if (all_emotes.length == 0) { //combine every emote list
        all_emotes = ffz_emotes.concat(ffz_global, bttv_emotes, bttv_global);
    }

    var words = message.split(" ");
    for (i = 0; i < words.length; i++) {
        for (j = 0; j < emotes.length; j++) {
            var code_index = word_in_codes(words[i], emotes[j].codes);

            if (code_index != -1) {
                if (emotes[j].users.indexOf(username) == -1) {
                    update_combo(emotes[j], username, code_index);
                }
                return;
            }
        }
    }
}
