import axios from "axios";

const USERNAME = "admin";     // same as backend
const PASSWORD = "12345";     // same as backend

const token = btoa(`${USERNAME}:${PASSWORD}`);

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Authorization": `Basic ${token}`,
    "Content-Type": "application/json"
  }
});

export default api;
