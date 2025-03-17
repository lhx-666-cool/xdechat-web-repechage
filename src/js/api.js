import { backendUrl } from "./globalVariables"
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { scrollToBottom, scrollToBottomWithAnimation } from "./util.js";
import store from '../store'

async function getKinds() {
    try {
        const response = await fetch(backendUrl + "/kinds");
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            return "err"
        }
    } catch (err) {
        console.error(err);
        return "err";
    }
}

async function fetchStream(session) {
    console.log("open:open")
    const controller = new AbortController();
    const payload = {
        messages: session.messages.slice(0, session.messages.length - 1),
        stream: true,
        intention: session.type,
        record_id: session.id,
        local_retrieval: session.local_retrieval,
        online_retrieval: session.online_retrieval,
        r1_model: session.r1_model,
    }
    if (session.file !== "") {
        payload.file_url = session.file;
    }
    let cnt = 0;
    const url = `${backendUrl}/v1/chat/completions`;
    new fetchEventSource(url, {
        method: "POST",
        signal: controller.signal,
        body: JSON.stringify(payload),
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
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
                    messageEnd(session)
                }).catch(err => {
                    session.messages[session.messages.length - 1].content = '```json\n' + JSON.stringify({ error: response.status }, null, 2) + '\n```'
                    setTimeout(() => {
                        scrollToBottom("message-list")
                    }, 0)
                    messageEnd(session)
                });

            }
        },
        onmessage(event) {
            cnt++;
            let receive = JSON.parse(event.data);
            if (cnt === 1) {
                session.messages[session.messages.length - 1].content = receive.choices[0].delta.content;
                setTimeout(() => {
                    scrollToBottomWithAnimation("message-list")
                }, 0)
            } else {
                session.messages[session.messages.length - 1].content += receive.choices[0].delta.content;
                setTimeout(() => {
                    scrollToBottom("message-list")
                }, 0)
            }
        },
        onclose() {
            console.log('close');
            messageEnd(session)
        },
    })
}

function messageEnd(session) {
    store.dispatch('setInputOccupied', false);
    session.topic = session.messages[1].content;
    const now = new Date();
    fetch(backendUrl + '/add-record', {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            id: session.id,
            datetime: now.toISOString(),
            record: JSON.stringify(session)
        })
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        fetch(backendUrl + `/delete-record?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
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

function addFeedback(record, type, content) {
    return new Promise((resolve, reject) => {
        fetch(backendUrl + `/add`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
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

function uploadFileFunc(file) {
    const formData = new FormData();
    formData.append('file', file);
    return new Promise((resolve, reject) => {
        fetch(backendUrl + `/upload`, {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
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
    addFeedback,
    uploadFileFunc
}