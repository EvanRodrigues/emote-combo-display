var Emote = function Emote(codes, art, audio){
    this.codes = codes;
    this.art = art;
    this.audio = audio;
    this.combo = 0;
    this.users = [];
    this.timer = null;
}