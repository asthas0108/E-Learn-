import axios from "axios";

// export const server = "http://localhost:5000";
export const server ="https://elevateu-1bbk.onrender.com";

export const clientServer = axios.create({
    baseURL: server,
});