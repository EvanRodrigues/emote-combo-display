var emotes = [{code:"Kappa", art:"./art/Kappa.png", audio:"./sounds/hehe_boii.mp3"}];


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
 * Displays the emote and plays audio.
 * After sound is played, emote gets removed from display.
 */
function show_emote(emote) {
    console.log(emote);
    $('#emote').attr('src', emote.art);
    $('#emote').css('display', 'block');
    play_audio(emote.audio);
    hide_emote();
}


function hide_emote() {
    setTimeout(function(){
	$('#emote').css('display', 'none');
    }, 5000);
}


/*
 * Quick check to see if there is an occurence of a specific emote in the message.
 */
function emote_in_message(emote, message) {
    if(message.indexOf(emote) != -1){ return true; }
    else { return false; }
}


function count_target_emote(emote, message) {
    var words = message.split(' ');
    var emote_count = 0;

    for(i = 0; i < words.length ; i++) {
	if (words[i] === emote) {
	    emote_count++;
	}
    }

    return emote_count;
}

/*
 * Finds and counts any emote
 */
function contains_target_emote(message) {
    for(i = 0; i < emotes.length ; i++) {
	if (emote_in_message(emotes[i].code, message)) {
	    show_emote(emotes[i]);
	}
    }

    var words = message.split(' ');
}
