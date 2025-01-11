import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../services/useAuth";
import useData from "../services/useData";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { setDarkMode, darkMode } = useData(); //this state value false
  const links = (
    <>
      <div>
        <NavLink
          className="hover:bg-transparent dark:text-gray-300 font-semibold transition-all duration-200 hover:focus:bg-transparent hover:text-[#0e9f6e]"
          to={"/assignments"}
        >
          Assignments
        </NavLink>
      </div>
      <div>
        <NavLink
          className="hover:bg-transparent dark:text-gray-300 font-semibold transition-all duration-200 hover:focus:bg-transparent hover:text-[#0e9f6e]"
          to={"/about-us"}
        >
          About Us
        </NavLink>
      </div>

      <div>
        <a
          href="#howitworks"
          className="hover:bg-transparent dark:text-gray-300 font-semibold transition-all duration-200 hover:focus:bg-transparent hover:text-[#0e9f6e]"
        >
          How it Work
        </a>
      </div>
      <div>
        <NavLink
          className="hover:bg-transparent dark:text-gray-300 font-semibold transition-all duration-200 hover:focus:bg-transparent hover:text-[#0e9f6e]"
          to={"/contact-us"}
        >
          Contact Us
        </NavLink>
      </div>
    </>
  );
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      if (savedTheme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setDarkMode(true);
      document.body.classList.add("light");
    }
  }, []);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");

      // Apply dark mode to the body tag
      if (newMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }

      return newMode;
    });
  };

  return (
    <div className="fixed w-full top-0 bg-white dark:bg-slate-900 z-50">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost pl-0 lg:hidden"
            >
              {/* className="h-5 w-5" */}
              <i className="fa-solid fa-bars text-xl dark:text-gray-400"></i>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content px-4 bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-5"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="text-2xl font-bold dark:text-gray-200">
            {/* <span className="mr-1 p-1 bg-green-500"></span> */}
            <span className="text-green-700 dark:text-green-500">A</span>
            ssignora{" "}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5">{links}</ul>
        </div>
        <div className="navbar-end gap-2">
          <button onClick={toggleDarkMode}>
            <i
              className={
                darkMode
                  ? "fa-solid fa-moon text-white text-xl"
                  : "fa-regular fa-sun text-slate-700 text-xl"
              }
            ></i>
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                onClick={async () => {
                  await logout();
                  toast.success("Logout success");
                }}
                className="btn btn-sm border-red-400 bg-red-50  dark:bg-red-100 hover:text-white hover:dark:text-red-600 dark:border-slate-900 hover:bg-red-500 rounded-md"
              >
                Logout
              </Link>
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dark:shadow-sm dark:bg-slate-900  dark:text-gray-400 dropdown-content gap-2 bg-base-100 rounded-box z-[1] mt-3 w-64 p-4 shadow"
                >
                  <div>
                    <NavLink to={"/profile"} className="justify-between">
                      Profile
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to={"/assignments-create"}>
                      Create Assignments
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to={"/my-attempted"}>My Attempted</NavLink>
                  </div>
                  <div>
                    <NavLink to={"/assignments-pending"}>
                      Pending Assignments
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to={"/setting"}>Settings</NavLink>
                  </div>
                </ul>
              </div>
            </div>
          ) : (
            <NavLink
              to={"/auth/login"}
              className="btn btn-sm hover:bg-green-700 dark:bg-green-600 dark:border-slate-700 bg-green-500 text-white rounded-md"
            >
              Join Now
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
