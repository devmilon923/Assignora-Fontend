import { Spinner } from "flowbite-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contextApi/AuthContext";
import useAxios from "../../services/useAxios";

export default function SocialLogin() {
  const [btnLoading, setBtnLoading] = useState(false);
  const api = useAxios();
  const { googleLogin } = useContext(AuthContext);
  const handleGoogle = async () => {
    setBtnLoading(true);
    try {
      const result = await googleLogin();
      const res = await api.post("/auth/add-user", {
        name: result.user.displayName,
        photo: result.user.photoURL,
        uid: result.user.uid,
        email: result.user.email,
      });
    
      const payload = {
        name: res.data.data.name,
        uid: res.data.data.uid,
      };
      await api.post(`/auth/set-cookie`, payload);
      setBtnLoading(false);
      return toast.success("Welcome!");
    } catch (error) {
    
      setBtnLoading(false);
      return toast.error(error.code);
    }
  };
  return (
    <div className="text-center">
      <button
        type="button"
        onClick={handleGoogle}
        className="text-slate-800 border bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
      >
        {btnLoading ? (
          <Spinner
            className="mr-2"
            aria-label="Alternate spinner button example"
            size="sm"
          />
        ) : (
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        Sign in with Google
      </button>
    </div>
  );
}
