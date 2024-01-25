// userService.js
import api from "../api";

const userAPI = {
  getUser: (userId) => api.get(`/users/${userId}`),
  updateUser: (userId, userData) => api.put(`/users/${userId}`, userData),
  // Add other user-related API functions as needed
};

export default userAPI;
