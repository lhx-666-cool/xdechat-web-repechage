const backendUrl =  window.__ENV__.API_URL && window.__ENV__.API_URL !== '' ? window.__ENV__.API_URL : "http://localhost:3000";
// const backendUrl = "http://liu.steeshacn:2222"
// const backendUrl = "http://127.0.0.1:2222"

export {
    backendUrl
}