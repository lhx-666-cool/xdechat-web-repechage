import { generateRandomString, getUid } from './util';

class Session{
    constructor(id, uid, lastUpdate, messages, topic, type, file) {
        if (arguments.length === 0) {
            this.id = generateRandomString(21)
            this.uid = getUid();
            this.lastUpdate = Date.now();
            this.topic = "新的聊天";
            this.type = "";
            this.messages = [{
                role: 'assistant',
                content: '请问你有什么需要帮助的吗'
            }],
            this.file = "";
            this.r1_model = false;
            this.local_retrieval = false;
            this.online_retrieval = false;
        }else {
            this.id = id;
            this.uid = uid;
            this.lastUpdate = lastUpdate;
            this.messages = messages;
            this.topic = topic;
            this.type = type;
            this.file = file;
            this.r1_model = false;
            this.local_retrieval = false;
            this.online_retrieval = false;
        }
    }
}

export {
    Session
}