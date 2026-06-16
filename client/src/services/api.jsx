import axios from "axios";

const API = axios.create({
  baseURL: "https://uco-ats.onrender.com/api",
});

export default API;