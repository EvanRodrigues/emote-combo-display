var Emote = function Emote(codes, art) {
    this.codes = codes;
    this.art = art;
}

var Combo = function Combo(codes, audio) {
    this.codes = codes;
    this.audio = audio;
    this.combo = 0;
    this.users = [];
    this.timer = null;
}