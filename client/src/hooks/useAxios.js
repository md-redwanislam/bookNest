import { useEffect } from "react";
import { api } from "../components/api/index.js";
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken && !config._retry) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const cookies = document.cookie;
            const response = await api.post(`/auth/refresh-token`);

            const { data } = response?.data;

            const updatedAuth = {
              ...auth,
              authToken: data,
            };
            setAuth(updatedAuth);

            localStorage.setItem("booknest_auth", JSON.stringify(updatedAuth));

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${data}`;
            return api(originalRequest);
          } catch (error) {
            setAuth(null);
            localStorage.removeItem("booknest_auth");
            window.location.href = "/login";
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth.authToken]);

  return { api };
};

export default useAxios;
