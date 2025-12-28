import HttpClient from "../utiles/axios";

export default {
  getAllUsers: () => HttpClient.get("/users"),
  getAdminUsers: () => HttpClient.get("/users/admins/list"),
  getUserById: (user_id) => HttpClient.get(`users/${user_id}`),
  createUser: (data) => HttpClient.post("/users", data),
  updateUser: (user_id, data) => HttpClient.patch(`users/${user_id}`, data),
  deleteUser: (user_id) => HttpClient.delete(`users/${user_id}`),
};
