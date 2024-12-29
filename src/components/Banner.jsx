import React from "react";
import Marquee from "react-fast-marquee";
import { NavLink } from "react-router-dom";
import useData from "../services/useData";

export default function Banner() {
  const { darkMode } = useData();
  return (
    <div className="text-center  space-y-4">
      <h1
        data-aos="zoom-in"
        data-aos-duration="1000"
        className="lg:text-5xl dark:text-gray-300 md:text-4xl text-3xl font-extrabold"
      >
        Innovate, Share, and
        <br /> Thrive Together
      </h1>
      <p
        data-aos="zoom-in"
        data-aos-duration="1000"
        className="text-gray-500 w-full md:w-2/3 mx-auto text-md px-2 md:text-lg"
      >
        Welcome to the Online Group-Study Platform, where you and your friends
        can share knowledge, create assignments, complete tasks, and grade each
        other's work in a seamless, collaborative environment.
      </p>
      <div className="grid w-fit justify-center gap-2 grid-cols-2 items-center mx-auto">
        <NavLink to={"/assignments"}>
          <button className="btn dark:border-slate-900 bg-green-500 hover:bg-green-600 transition-all duration-300 text-white">
            Solve Assignment
          </button>
        </NavLink>
        <NavLink to={"/assignments-create"}>
          {" "}
          <button className="btn border bg-white hover:bg-gray-100 dark:bg-gray-200 transition-all duration-300 text-gray-500  dark:text-gray-700">
            Create Assignment
          </button>
        </NavLink>
      </div>
      <div className="md:w-2/3 w-full mx-auto md:pt-6">
        <Marquee
          gradientColor={darkMode && "#0f172a"}
          gradient={true}
          speed={20}
          className=""
        >
          <img
            className="w-24 m-2"
            src="https://cdn.freebiesupply.com/logos/large/2x/facebook-1-logo-png-transparent.png"
            alt=""
          />
          <img
            className="w-24 m-2"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Atlassian.svg/2560px-Atlassian.svg.png"
            alt=""
          />
          <img
            className="w-24 m-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/2560px-LeetCode_Logo_black_with_text.svg.png"
            alt=""
          />
          <img
            className="w-24 m-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/VMware_logo.svg/2560px-VMware_logo.svg.png"
            alt=""
          />
          <img
            className="w-20 m-2"
            src="https://www.pngall.com/wp-content/uploads/13/Google-Logo-PNG-Pic.png"
            alt=""
          />
          <img
            className="w-20 m-2"
            src="https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-blue-png-large-size.png"
            alt=""
          />
          <img
            className="w-16 m-2"
            src="https://www.pngall.com/wp-content/uploads/13/Adobe-Logo.png"
            alt=""
          />

          <img
            className="w-20 m-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Microsoft_Office_13-16_Logo.png/800px-Microsoft_Office_13-16_Logo.png"
            alt=""
          />
        </Marquee>
      </div>
    </div>
  );
}
