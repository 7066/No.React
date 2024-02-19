import axios from "axios";
const instance = axios.create({
  baseURL: "/",
  timeout: 60000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    message.error({
      content: "请求错误!",
    });
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    const { code, data, result } = response.data;
    if (code === 200) return data || result;

    message.error({
      content: "请求错误!",
    });

    console.error(response);
    return Promise.reject(new Error("请求失败!"));
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    message.error({
      content: "服务器错误!",
    });
    return Promise.reject(error);
  },
);

export const request = instance;
