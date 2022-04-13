import axios, { AxiosRequestConfig } from "axios";

const ApiServices = {
  get: (url: string, config?: AxiosRequestConfig<any>) => {
    if (config) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
    } else {
      config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
    }
    return axios.get(url, config);
  },
  post: (url: string, data: any, config?: AxiosRequestConfig<any>) => {
    console.log("elotte", config);
    if (config) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      };
    } else {
      config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
    }
    console.log("utana", config);
    return axios.post(url, data, config);
  },
};
export default ApiServices;
