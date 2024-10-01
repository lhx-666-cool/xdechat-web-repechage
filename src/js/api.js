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

async function fetchStream(uid, id, data, type) {
    const controller = new AbortController();
    const payload = {
        messages: data,
        uid: uid,
        stream: true,
        type: type,
        record_id: id
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
                const err = response.json();
                err.then(res => res).then(res => {
                    console.log(res)
                    controller.abort()
                    data.push({
                        role: 'assistant',
                        content: '```json\n' + JSON.stringify(res, null, 2) + '\n```',
                    });
                    setTimeout(() => {
                        scrollToBottom("message-list")
                    }, 0)
                    store.dispatch('setInputOccupied', false);
                }).catch(err => console.log(err));

            }
        },
        onmessage(event) {
            cnt ++;
            let receive = JSON.parse(event.data);
            if (cnt === 1) {
                data.push({
                    role: 'assistant',
                    content: receive.choices[0].delta.content,
                });
                setTimeout(() => {
                    scrollToBottomWithAnimation("message-list")
                }, 0)
            }else {
                data[data.length - 1].content += receive.choices[0].delta.content;
                setTimeout(() => {
                    scrollToBottom("message-list")
                }, 0)
            }
        },
        onclose() {
            console.log('close');
            store.dispatch('setInputOccupied', false);
        },
    })

    // try{
    //     const response = await fetch(url, {
    //         method: "POST",
    //         body: JSON.stringify(payload),
    //     });
    //     if (!response.ok) {
    //         // console.log(response.json())
    //         const err = await response.json();

    //         return;
    //     }
    //
    //     const reader = response.body.getReader();
    //     const decoder = new TextDecoder();
    //     let cnt = 0;
    //     while (true) {

    //     }
    // }catch(e) {
    //     console.error(e);
    // }
}


export {
    getKinds,
    fetchStream
}