import HttpClient from "../utiles/axios";

export default {
  register: (data) => HttpClient.post("auth/register", data),
  loginByEmail: (data) => HttpClient.post("auth/login", data),
  loginByOtp: (data) => HttpClient.post("auth/login_otp", data),
  loginWithGoogle: (credential) => HttpClient.post("auth/google", { credential }),
  getProfile: () => HttpClient.get("auth/me"),
};
