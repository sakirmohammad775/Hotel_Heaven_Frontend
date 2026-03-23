import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://hotel-heaven-backend.vercel.app/api/v1",
});

export default apiClient;