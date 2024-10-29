import { backendUrl } from "./globalVariables"
async function getChatHistory() {
    try {
        const response = await fetch(backendUrl + "/get-record", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            return data.data;
        } else if(response.status === 401) {
        } else {
            return "err"
        }
    }  catch (err) {
        console.error(err);
        return "err";
    }
}


export {
    getChatHistory
}