import { backendUrl } from "./globalVariables"
async function getChatHistory(uid) {
    try {
        const response = await fetch(backendUrl + "/get-record?uid=" + uid);
        if (response.status === 200) {
            const data = await response.json();
            return data.data;
        }else {
            return "err"
        }
    } catch (err) {
        console.error(err);
        return "err";
    }
}


export {
    getChatHistory
}