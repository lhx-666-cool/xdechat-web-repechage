import { backendUrl } from "./globalVariables"
import { fetchEventSource } from '@microsoft/fetch-event-source';
import {scrollToBottom, scrollToBottomWithAnimation} from "./util.js";
import store from '../store'

async function getKinds() {
    try {
        const response = await fetch(backendUrl + "/kinds");
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }else {
            return "err"
        }
    } catch (err) {
        console.error(err);
        return "err";
    }
}

async function fetchStream(uid, session) {
    const controller = new AbortController();
    const payload = {
        messages: session.messages.slice(0, session.messages.length - 1),
        uid: uid,
        stream: true,
        type: session.type,
        record_id: session.id
    }
    let cnt = 0;
    const url = `${backendUrl}/v1/chat/completions`;
    new fetchEventSource(url, {
        method: "POST",
        signal: controller.signal,
        body: JSON.stringify(payload),
        onopen(response) {
            // 连接打开时的逻辑
            if (response.status !== 200) {
                controller.abort()
                const err = response.json();
                err.then(res => res).then(res => {
                    console.log(res)
                    session.messages[session.messages.length - 1].content = '```json\n' + JSON.stringify(res, null, 2) + '\n```'
                    setTimeout(() => {
                        scrollToBottom("message-list")
                    }, 0)
                    messageEnd(uid, session)
                }).catch(err => {
                    session.messages[session.messages.length - 1].content = '```json\n' + JSON.stringify({error: response.status}, null, 2) + '\n```'
                    setTimeout(() => {
                        scrollToBottom("message-list")
                    }, 0)
                    messageEnd(uid, session)
                });

            }
        },
        onmessage(event) {
            cnt ++;
            let receive = JSON.parse(event.data);
            if (cnt === 1) {
                session.messages[session.messages.length - 1].content = receive.choices[0].delta.content;
                setTimeout(() => {
                    scrollToBottomWithAnimation("message-list")
                }, 0)
            }else {
                session.messages[session.messages.length - 1].content += receive.choices[0].delta.content;
                setTimeout(() => {
                    scrollToBottom("message-list")
                }, 0)
            }
        },
        onclose() {
            console.log('close');
            messageEnd(uid, session)
        },
    })
}

function messageEnd(uid, session) {
    store.dispatch('setInputOccupied', false);
    session.topic = session.messages[1].content;
    const now = new Date();
    fetch(backendUrl + '/add-record', {
        method: "POST",
        body: JSON.stringify({
            id: session.id,
            uid: uid,
            datetime: now.toISOString(),
            record: JSON.stringify(session)
        })
    })
}

function deleteMessage(uid, id) {
    return new Promise((resolve, reject) => {
        fetch(backendUrl + `/delete-record?id=${id}&uid=${uid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // 假设返回的是 JSON 数据
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function addFeedback(uid, record, type, content) {
    return new Promise((resolve, reject) => {
        fetch(backendUrl + `/add`, {
            method: "POST",
            body: JSON.stringify({
                uid,
                record,
                type,
                content
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // 假设返回的是 JSON 数据
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export {
    getKinds,
    fetchStream,
    deleteMessage,
    addFeedback
}