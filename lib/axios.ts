import axios from "axios";
import { getSession } from "next-auth/react";

const apiAxios = axios.create({ baseURL: "/server" });

apiAxios.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = session.accessToken;
  }
  return config;
});

export default apiAxios;
