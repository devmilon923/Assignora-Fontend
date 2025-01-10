import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../services/useAuth";

export default function Setting() {
  const { changePassword } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);
  const handleForm = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const oldpassword = e.target.oldpassword.value;
    const newpassword = e.target.newpassword.value;
    try {
      await changePassword(newpassword, oldpassword);
      setBtnLoading(false);
      e.target.reset();
      return toast.success("Password change success");
    } catch (error) {
      setBtnLoading(false);
      return toast.error(error.message);
    }
  };

  return (
    <div>
      <Card className="max-w-sm mx-auto">
        <form onSubmit={handleForm} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="oldpassword" value="Your password" />
            </div>
            <TextInput
              id="oldpassword"
              type="password"
              name="oldpassword"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="newpassword" value="New password" />
            </div>
            <TextInput
              id="newpassword"
              type="password"
              name="newpassword"
              required
            />
          </div>

          <Button type="submit">
            {" "}
            {btnLoading && (
              <Spinner
                className="mr-1"
                aria-label="Alternate spinner button example"
                size="sm"
              />
            )}{" "}
            Change Password
          </Button>
          <p className="text-gray-500 text-sm text-center">
            Forget password? <br />
            <Link to={"/auth/reset-password"} className="underline">
              reset password
            </Link>
          </p>
          <p className="text-gray-500 text-sm text-center">
            <span className="font-semibold text-red-400">Note:</span> Social
            login users must reset their password once before they can change
            it.
          </p>
        </form>
      </Card>
    </div>
  );
}
