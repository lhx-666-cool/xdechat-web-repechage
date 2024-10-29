import { backendUrl } from "./globalVariables"
import { logout } from "./util";
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
            logout();
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