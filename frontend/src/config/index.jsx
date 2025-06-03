import axios from "axios";

export const server = "http://localhost:5000";

export const clientServer = axios.create({
    baseURL: server,
});