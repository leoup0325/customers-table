import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://ballistictest.azurewebsites.net/api/",
});

instance.interceptors.request.use((config) => {
  if (config.method.toLowerCase() === "post") {
    return {
      ...config,
      headers: {
        ...config.headers,
        "x-client-id": "12345",
      },
    };
  }
  return config;
});

export default instance;
