var chatClient = function chatClient(options){
    this.username = options.username;
    this.password = options.password;
    this.channel = options.channel;

    this.server = 'irc-ws.chat.twitch.tv';
    this.port = 443;
}


chatClient.prototype.open = function open(){
    this.webSocket = new WebSocket('wss://' + this.server + ':' + this.port + '/', 'irc');

    this.webSocket.onmessage = this.onMessage.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onopen = this.onOpen.bind(this);
};


chatClient.prototype.onError = function onError(message){
    console.log('Error: ' + message);
};


/*
 * Simple message handler method.
 * Takes the message and parses the data.
 * If there is a chat message, we check if there is a target emote used in the message
 */
chatClient.prototype.onMessage = function onMessage(message){
    var socket = this.webSocket;

    if(message !== null) {
	    var parsed = this.parseMessage(message.data);
	    var parsed_username = parsed.username;
	    var parsed_message = parsed.message;

	    if(parsed != null) {
	        if(parsed.command === "PING") {
                this.webSocket.send("PONG :" + parsed.message);
	        }

	        if(parsed_message != null) {
		        contains_target_emote(parsed_message, parsed_username);
	        }
        }
    }
};


chatClient.prototype.onOpen = function onOpen(){
    var socket = this.webSocket;

    if(socket !== null && socket.readyState === 1) {
        console.log('Connecting and authenticating...');

        socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
        socket.send('PASS ' + this.password);
        socket.send('NICK ' + this.username);
        socket.send('JOIN ' + this.channel);
    }

};


chatClient.prototype.onClose = function onClose(){
    console.log('Disconnected from the chat server.');
};


chatClient.prototype.close = function close(){
    if(this.webSocket){
        this.webSocket.close();
    }
};



/*
 * Credit to twitchdev for this method.
 * Parses the server response and separates the response into useful variables.
 */
chatClient.prototype.parseMessage = function parseMessage(rawMessage) {
    var parsedMessage = {
        message: null,
        tags: null,
        command: null,
        original: rawMessage,
        channel: null,
        username: null
    };

    if(rawMessage[0] === '@'){
        var tagIndex = rawMessage.indexOf(' '),
        userIndex = rawMessage.indexOf(' ', tagIndex + 1),
        commandIndex = rawMessage.indexOf(' ', userIndex + 1),
        channelIndex = rawMessage.indexOf(' ', commandIndex + 1),
        messageIndex = rawMessage.indexOf(':', channelIndex + 1);

        parsedMessage.tags = rawMessage.slice(0, tagIndex);
        parsedMessage.username = rawMessage.slice(tagIndex + 2, rawMessage.indexOf('!'));
        parsedMessage.command = rawMessage.slice(userIndex + 1, commandIndex);
        parsedMessage.channel = rawMessage.slice(commandIndex + 1, channelIndex);
        parsedMessage.message = rawMessage.slice(messageIndex + 1).replace("\r\n", "");
    } 
    else if(rawMessage.startsWith("PING")) {
        parsedMessage.command = "PING";
        parsedMessage.message = rawMessage.split(":")[1];
    }

    return parsedMessage;
}
