export default {
  getToken: () => {
    return window.localStorage.getItem("access-token");
  },
  setToken: (token) => {
    window.localStorage.setItem("access-token", token);
  },
  removeToken: () => {
    window.localStorage.removeItem("access-token");
  },
  getUserInfo: () => {
    return JSON.parse(window.localStorage.getItem("UserInfo"));
  },
  setUserInfo: (info) => {
    window.localStorage.setItem("UserInfo", JSON.stringify(info));
  },
  removeUserInfo: () => {
    window.localStorage.removeItem("UserInfo");
  },
};
