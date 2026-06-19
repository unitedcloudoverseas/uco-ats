import axios from "axios";

const API = axios.create({
  baseURL: "https://uco-ats-1.onrender.com",
});

export default API;