import {
  Button,
  Card,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../services/useAuth";
import SocialLogin from "./SocialLogin";

export default function Login() {
  const { emailPasswordLogin } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);
  useEffect(() => {
    document.title = "Login and account | Assignora";
  }, []);
  const handleForm = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data.entries());
    try {
      await emailPasswordLogin(obj.email, obj.password);
      setBtnLoading(false);
      return toast.success("Signin success");
    } catch (error) {
      setBtnLoading(false);
      return toast.error(error.code);
    }
  };

  return (
    <div>
      <Card className="max-w-sm mx-auto">
        <form onSubmit={handleForm} className="flex flex-col gap-4">
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
            <TextInput id="password" type="password" name="password" required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
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
            Login now
          </Button>
          <p className="text-gray-500 text-sm text-center">
            Don't have an account? <br />
            <Link to={"/auth/create"} className="underline">
              Create now
            </Link>
          </p>
        </form>
        <div className="divider">OR</div>
        <SocialLogin />
      </Card>
    </div>
  );
}
