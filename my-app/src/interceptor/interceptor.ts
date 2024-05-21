import axios from "axios";

axios.interceptors.request.use((config) => {
  const authToken = Math.floor(Math.random() * 100 + 1);
  config.headers.Authorization = `Bearer ${authToken}`;
  console.log("authToken", authToken);
  return config;
});

axios.interceptors.response.use(
  (config) => {
    if (config.status === 200) {
      console.log("if 200");
    }
    if (config.status === 404) {
      console.log("if 404");
    }
    console.log("first");
    return config;
  },
  function (err) {
    if (err.response.status === 404) {
      console.log("err", err);
    }
    return err;
  }
);
