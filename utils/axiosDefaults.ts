import axios from "axios";

// const token = sessionStorage.getItem("token");

export default axios.create({
    baseURL: "http://localhost:7143/api",
    headers: {
        "Content-type": "application/json",
        // "Authentication" : `Bearer ${token}`
    },
});
