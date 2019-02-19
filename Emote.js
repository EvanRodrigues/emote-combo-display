var Emote = function Emote(code, art, audio){
    this.code = code;
    this.art = art;
    this.audio = audio;
    this.combo = 0;
    this.users = [];
    this.timer = null;
}
