import { backendUrl } from "./globalVariables"
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

export {
    getKinds
}