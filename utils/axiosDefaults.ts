import axios from "axios";



const $api = axios.create({
    baseURL: "https://localhost:7143/api",
    headers: {
        "Content-type": "application/json",
    },
});

$api.interceptors.request.use(config=>{
    if (config.headers === undefined) {
        config.headers = {};
    }
    config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`
    return config;
})

export default $api;
