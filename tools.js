var emotes = [{code:"Kappa", art:"./art/Kappa.png", audio:"./sounds/hehe_boii.mp3"}, {code:"KKona", art:"./art/KKona.png", audio:"./sounds/MLG.mp3"}];

var current_emote = "";
var current_combo = 0;
var current_users = [];
var cooldown_active = false;



/*
 * Plays an mp3 file.
 * Input: The path to the audio file.
 */
function play_audio(audio_file) {
    var audio = new Audio(audio_file);
    audio.volume = 0.2;
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
    }, 10000);
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


function update_combo(emote) {
    if(current_emote === emote.code) {

    }
    else {
	current_emote = emote.code;
	current_combo = 1;
    }

    return;
}


/*
 * Finds the first occurence of any target emote.
 */
function contains_target_emote(message) {
    if(cooldown_active == true) { return; }

    var words = message.split(' ');

    for(i = 0; i < words.length ; i++) {
	for(j = 0; j < emotes.length ; j++) {
	    if (emotes[j].code === words[i]) {
		show_emote(emotes[j]);
		update_combo(emotes[j]);
		return;
	    }
	}
    }
}
