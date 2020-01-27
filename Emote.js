var NewEmote = function Emote(code, art) {
    this.code = code;
    this.art = art;
    this.combo = 0;
    this.users = [];
    this.timer = null;
}

var Emote = function Emote(codes, art, audio) {
    this.codes = codes;
    this.art = art;
    this.audio = audio;
    this.combo = 0;
    this.users = [];
    this.timer = null;
}