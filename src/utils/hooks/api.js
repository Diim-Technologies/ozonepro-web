import axios from "axios";
import Router from "next/router";
// import queryClient from "utils/queries";

const authedFetch = axios.create({
  /** We're not using baseURL because we have already set the api path rewrites in next.config.js */
  headers: {
    "Content-Type": "application/json",
  },
});

authedFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ozone_access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    }

    Router.push("/register");
  },
  (error) => {
    return Promise.reject(error);
  }
);

authedFetch.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      queryClient.invalidateQueries("user");
      Router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default authedFetch;
