import { Button, FileInput, TextInput } from "flowbite-react";
import React from "react";
import useAuth from "../../services/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  const handleSubmit = () => {
    e.preventDefault();
    // Handle form submission, e.g., updating the profile info
    console.log("Updated profile:", { image, name });
  };

  return (
    <div className="p-6 max-w-xl grid grid-cols-1  mx-auto space-y-6">
      {/* Profile Info Row */}
      <div className="flex items-center space-x-6">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{user?.displayName}</h2>
          <p className="text-sm text-gray-500">Joined on </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-500">
            Additional Info: Some details here.
          </p>
        </div>
      </div>

      {/* Update Form Row */}
      <div className="space-y-4">
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Update Image</label>
            <FileInput />
          </div>
          <div>
            <label className="block text-sm font-medium">Update Name</label>
            <TextInput />
          </div>
          <div className="pt-4">
            <Button type="submit">Update Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
