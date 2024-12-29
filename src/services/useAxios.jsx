import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { auth } from "../components/auth/firebase/firebase-setup";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});

const useAxios = () => {
  const logout = async () => {
    return signOut(auth);
  };
  useEffect(() => {
    // Adding the response interceptor
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          try {
            await logout();
            return toast.error("Unauthorized! Please login.");
          } catch (err) {
            console.error(err);
          }
        }
        // Passing the entire error object to maintain full context
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove the interceptor
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  return api;
};

export default useAxios;
