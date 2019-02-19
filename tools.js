var cooldown_active = false;


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
    var audio = new Audio(audio_file);
    audio.volume = 1;
    audio.play();
}


/*
 * After a combo has been achieved, a cooldown is activated.
 * While the cooldown is activated, no checking for combos.
 */
function start_cooldown() {
    cooldown_active = true;
    setTimeout(function() {
	cooldown_active = false;
    }, 30000);
}


/*
 * Displays the emote and plays audio.
 * After sound is played, emote gets removed from display.
 */
function show_emote(emote) {
    $('#emote').attr('src', emote.art);
    $('#emote').fadeIn(500);
    play_audio(emote.audio);
    hide_emote();
    start_cooldown();
}


/*
 * Fades emote out of display after 5 seconds.
 */
function hide_emote() {
    setTimeout(function(){
	$('#emote').fadeOut(500);
    }, 5000);
}


/*
 * Starts the timing window for the current emote to be combo'd.
 */
function start_timer(emote) {
    return setTimeout(function(){
 	console.log(emote.code + " timer stopped");
	timer_started = false;
	reset_combo(emote);
    }, 35000);
}


/*
 * Updates the global variables that keep track of the emote combo.
 */
function update_combo(emote, username) {
    //Combo started.
    if(emote.timer == null) {
	emote.combo = 1;
	emote.users = [username];
	emote.timer = start_timer(emote);
    }
    //Combo continuing
    else {
	emote.combo++;
	emote.users.push(username);

	//Combo achieved! Show face, play audio, and reset emote combo.
	if(emote.combo == 7) {
	    show_emote(emote);
	    reset_combo(emote);
	}
    }

    console.log("emote: " + emote.code);
    console.log("combo: " + emote.combo);
    console.log("users: " + emote.users);
}


/*
 * Finds the first occurence of any target emote.
 */
function contains_target_emote(message, username) {
    if(cooldown_active == true) { return; }

    var words = message.split(' ');
    for(i = 0; i < words.length ; i++) {
	for(j = 0; j < emotes.length ; j++) {
	    if (emotes[j].code === words[i]) {
		if(emotes[j].users.indexOf(username) == -1) {
		    update_combo(emotes[j], username);
		}
		return;
	    }
	}
    }
}
