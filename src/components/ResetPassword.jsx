import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../services/useAuth";

export default function ResetPassword() {
  const { resetPassword, user } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);
  const handleForm = async (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const email = e.target.email.value;
    try {
      await resetPassword(email);
      setBtnLoading(false);
      e.target.reset();
      return toast.success("Reset password link send succesfully");
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
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              defaultValue={user?.email}
              readOnly={user?.email}
              id="email"
              type="email"
              name="email"
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
          {user ? (
            ""
          ) : (
            <p className="text-gray-500 text-sm text-center">
              Back to{" "}
              <Link to={"/auth/login"} className="underline">
                login
              </Link>
            </p>
          )}

          <p className="text-gray-500 text-sm text-center">
            <span className="font-semibold text-red-400">Note:</span> If the
            reset email is sent successfully but you can't find it, please check
            your email's spam folder or social folder.
          </p>
        </form>
      </Card>
    </div>
  );
}
