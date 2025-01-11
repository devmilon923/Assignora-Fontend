import React, { useEffect } from "react";
import community from "./../assets/Community.svg";
export default function About() {
  useEffect(() => {
    document.title = "About Us | Assignora";
  }, []);
  return (
    <section className="py-16 bg-gray-50 rounded-md dark:bg-slate-800">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            About Us
          </h2>
          <p className="lg:text-lg text-md text-gray-600 dark:text-gray-300">
            At Assignora, we are committed to fostering collaboration and
            innovation in learning. Discover how we empower communities to
            achieve their goals together.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="w-full lg:w-1/2">
            <img
              src={community}
              alt="Team collaboration"
              className="rounded-lg "
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To empower individuals and groups by providing a platform that
                makes learning and task management collaborative, efficient, and
                enjoyable.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To become the go-to platform for collaborative learning,
                enabling users worldwide to share knowledge and thrive together.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Our Values
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Collaboration, innovation, and inclusivity drive every decision
                we make at Assignora.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
