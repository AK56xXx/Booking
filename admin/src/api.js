// api.js
import axios from "axios";



const apiGetUser = axios.get({
  baseURL: "localhost:8800/api/users/${userId}", // replace with your actual backend URL
});

export default apiGetUser;
