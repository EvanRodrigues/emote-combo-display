var current_emote = "";
var current_combo = 0;
var current_users = [];
var cooldown_active = false;
var timer;


/*
 * Resets the combo to default values.
 */
function reset_combo() {
    current_emote = "";
    current_combo = 0;
    current_users = [];
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
    }, 180000);
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
function start_timer() {
    timer = setTimeout(function(){
 	console.log("timer stopped");
	timer_started = false;
	reset_combo();
    }, 20000);
}


/*
 * Updates the global variables that keep track of the emote combo.
 */
function update_combo(emote, username) {
    console.log("update_combo");

    if(current_emote === emote.code) { //Combo still going.
	current_combo++;
	current_users.push(username);

	//Combo target hit! Show face, play audio, and then reset.
	if(current_combo == 10) {
	    show_emote(emote);
	    reset_combo();
	}
    }
    else { //New combo started
	clearTimeout(timer);
	current_emote = emote.code;
	current_combo = 1;
	current_users = [username];
	start_timer();
    }
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
		if(current_users.indexOf(username) == -1) {
		    update_combo(emotes[j], username);
		}
		return;
	    }
	}
    }
}
