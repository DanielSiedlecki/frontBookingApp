import axios from "axios";
import dotenv from 'dotenv';

const http = axios.create({
    baseURL: 'http://localhost:8080',

    headers: {
        "Content-Type": "application/json",
    },
});

export { http };