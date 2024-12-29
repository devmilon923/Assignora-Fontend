import {
  Button,
  Card,
  Checkbox,
  FileInput,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextApi/AuthContext";

import { imageToUrl } from "../../services/imageToUrl";
import useAxios from "../../services/useAxios";
import SocialLogin from "./SocialLogin";

export default function Create() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [imageState, setImageState] = useState("Add Your Profile Picture");
  const { emailPasswordCreate, profileUpdate } = useContext(AuthContext);
  const api = useAxios();
  useEffect(() => {
    document.title = "Create and account | Assignora";
  }, []);
  const handleForm = async (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const data = new FormData(e.target);
    const obj = Object.fromEntries(data.entries());
    if (!obj.photo.size) {
      setBtnLoading(false);
      return toast.error("Image is required!");
    }

    // Create account:
    try {
      const url = await imageToUrl(obj.photo);
      const result = await emailPasswordCreate(obj.email, obj.password);
      await profileUpdate({
        displayName: obj.name,
        photoURL: url,
      });
      const res = await api.post("/auth/add-user", {
        name: result.user.displayName,
        photo: url,
        uid: result.user.uid,
        email: result.user.email,
      });
      const payload = {
        name: res.data.data.name,
        uid: res.data.data.uid,
      };
      await api.post(`/auth/set-cookie`, payload);
      e.target.reset();
      setBtnLoading(false);
      return toast.success("Signup success");
    } catch (error) {
      setBtnLoading(false);
      return toast.error(error.code);
    }
  };
  return (
    <div className="mb-12">
      <Card className="max-w-sm mx-auto">
        <form onSubmit={handleForm} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              placeholder="e,g Password@#1234"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <div>
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-6 w-6 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">
                    {imageState}
                  </p>
                </div>
                <FileInput
                  id="dropzone-file"
                  onChange={(e) =>
                    e.target.files && setImageState("Photo accepted!")
                  }
                  name="photo"
                  className="hidden"
                />
              </Label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">
            {btnLoading && (
              <Spinner
                className="mr-1"
                aria-label="Alternate spinner button example"
                size="sm"
              />
            )}
            Create Account
          </Button>
          <p className="text-gray-500 text-sm text-center">
            Already have an account? <br />
            <Link to={"/auth/login"} className="underline">
              Login now
            </Link>
          </p>
        </form>
        <div className="divider">OR</div>
        <SocialLogin />
      </Card>
    </div>
  );
}
