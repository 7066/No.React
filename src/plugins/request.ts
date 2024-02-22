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
    // 业务 code
    const { code, data } = response.data;
    if (code === 200) return data;

    // 接口 状态
    const { status } = response;
    if (status === 200) return data;

    message.error("请求错误!");
    console.error(response);
    return Promise.reject(new Error("请求失败!"));
  },
  function (error) {
    const {
      response: { status },
    } = error;

    // 接口 状态
    switch (status) {
      case 400:
        message.error("400请求失败!");
        break;

      case 404:
        message.error("404接口地址错误!");
        break;

      case 500:
        message.error("服务器错误!");
        break;
    }
    return Promise.reject(error);
  },
);

export const request = instance;
