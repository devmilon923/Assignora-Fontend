import { useQuery } from "@tanstack/react-query";
import { Button, FileInput, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { imageToUrl } from "../../services/imageToUrl";
import useAuth from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import { auth } from "./firebase/firebase-setup";

const UserProfile = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const { user, profileUpdate, setUser } = useAuth();
  const api = useAxios();
  const { data: profile, error } = useQuery({
    queryKey: ["myprofile"],
    queryFn: async () => {
      const res = await api.get("/auth/myprofile");
      return res.data.data;
    },
  });
  console.log(profile);
  console.log(error);
  const handleSubmit = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData.entries());
    if (!object.displayName.trim()) {
      setBtnLoading(false);
      return toast.error("Name not be an empty");
    }
    if (object.image?.type.split("/")[0] === "image") {
      const url = await imageToUrl(object.image);
      try {
        await profileUpdate({ displayName: object.displayName, photoURL: url });
        await api.post("/auth/update-profile", {
          name: auth.currentUser?.displayName,
          uid: auth.currentUser?.uid,
          photo: url,
        });
        setUser({ ...auth.currentUser });
        setBtnLoading(false);
        return toast.success("Profile update successfully");
      } catch (error) {
        setBtnLoading(false);
        console.log(error.message);
        return toast.error("Failed to update");
      }
    } else {
      try {
        await profileUpdate({ displayName: object.displayName });
        await api.post("/auth/update-profile", {
          name: auth.currentUser?.displayName,
          uid: auth.currentUser?.uid,
        });

        setUser({ ...auth.currentUser });
        setBtnLoading(false);
        return toast.success("Profile update successfully");
      } catch (error) {
        setBtnLoading(false);
        console.log(message);
        return toast.error("Failed to update");
      }
    }

    // Handle form submission, e.g., updating the profile info
  };

  return (
    <div className="p-4 max-w-xl grid grid-cols-1  mx-auto space-y-6">
      {/* Profile Info Row */}
      <div className="flex items-center space-x-6">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center mb-2 justify-between text-center gap-3">
            <h2 className="text-xl  font-semibold dark:text-white">
              {user?.displayName}
            </h2>
            <p className="text-xs  ">
              <Link
                to={"/my-attempted"}
                className="px-2 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 "
              >
                Your Attempt
              </Link>
            </p>
          </div>

          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-500">
            Total Marks: {profile?.totalMarks}
          </p>
          <p className="text-sm text-gray-500">
            Assignment: {profile?.assignment.length}
          </p>
        </div>
      </div>

      {/* Update Form Row */}
      <div className="space-y-4">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-1">
            <label className="block text-sm font-medium text-gray-500">
              Update Image
            </label>
            <FileInput name="image" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Update Name
            </label>
            <TextInput defaultValue={user?.displayName} name="displayName" />
          </div>
          <div className="pt-4 ">
            <Button className="mx-auto" type="submit">
              {btnLoading && (
                <Spinner
                  className="mr-1"
                  aria-label="Alternate spinner button example"
                  size="sm"
                />
              )}
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
