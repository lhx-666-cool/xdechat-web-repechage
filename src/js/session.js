import { generateRandomString, getUid } from './util';

class Session{
    constructor(id, uid, lastUpdate, message, topic, type) {
        if (arguments.length === 0) {
            this.id = generateRandomString(21)
            this.uid = getUid();
            this.lastUpdate = Date.now();
            this.topic = "新的聊天";
            this.type = "";
            this.message = []
        }else {
            this.id = id;
            this.uid = uid;
            this.lastUpdate = lastUpdate;
            this.message = message;
            this.topic = topic;
            this.type = type;
        }
    }
    onNewMessage(message) {
        this.message.push({
            role: 'assistant',
            content: message,
        })
    }
}

export {
    Session
}