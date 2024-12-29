import React from "react";

export default function Features() {
  return (
    <div>
      <div className=" mx-auto  px-2 lg:px-0">
        <div className="text-center mb-10">
          <h2 className="lg:text-2xl dark:text-gray-400 text-xl font-bold text-primary-800">
            Highlighted Features
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-6">
          {/* Can Help Image */}
          <div className="order-2 lg:order-1">
            <img
              className="w-full hidden xl:block mx-auto"
              src="/features.svg"
              alt="features"
            />
          </div>
          {/* End Can Help Image */}

          <div className="grid grid-cols-1 md:grid-cols-2 order-1 lg:order-2">
            <div
              data-aos-anchor-placement="bottom-bottom"
              data-aos="zoom-in"
              data-aos-duration="1000"
              className="w-full mb-4 px-2 "
            >
              <div className="h-full py-4 px-6 hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer transition-all duration-300 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                <h3 className="text-xl font-bold text-md mb-4 dark:text-gray-300">
                  Assignment Creation
                </h3>
                <p className="text-sm dark:text-gray-400">
                  Design and distribute assignments effortlessly. Registered
                  users can create structured tasks, set deadlines, and
                  encourage group collaboration for effective learning and task
                  management.
                </p>
              </div>
            </div>

            <div
              data-aos-anchor-placement="bottom-bottom"
              data-aos="zoom-in"
              data-aos-duration="1000"
              className="w-full mb-4 px-2"
            >
              <div className="h-full py-4 px-6 border hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer transition-all duration-300 border-green-500 border-t-0 border-l-0 rounded-br-xl">
                <h3 className="text-xl font-bold text-md mb-4 dark:text-gray-300">
                  Collaborative Grading
                </h3>
                <p className="text-sm dark:text-gray-400">
                  Review and grade assignments submitted by friends. Provide
                  constructive feedback to help others improve, fostering a
                  supportive and engaging group-study environment.
                </p>
              </div>
            </div>

            <div
              data-aos-anchor-placement="bottom-bottom"
              data-aos="zoom-in"
              data-aos-duration="1000"
              className="w-full  mb-4 px-2"
            >
              <div className="h-full py-4 px-6 border hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer transition-all duration-300 border-green-500 border-t-0 border-l-0 rounded-br-xl">
                <h3 className="text-xl font-bold text-md mb-4 dark:text-gray-300">
                  User-friendly Interface
                </h3>
                <p className="text-sm dark:text-gray-400">
                  Enjoy a clean, intuitive design that makes navigating,
                  creating, and managing assignments simple and enjoyable. A
                  seamless experience for all group members!
                </p>
              </div>
            </div>

            <div
              data-aos-anchor-placement="bottom-bottom"
              data-aos="zoom-in"
              data-aos-duration="1000"
              className="w-full  mb-4 px-2"
            >
              <div className="h-full py-4 px-6 border hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer transition-all duration-300 border-green-500 border-t-0 border-l-0 rounded-br-xl">
                <h3 className="text-xl font-bold text-md mb-4 dark:text-gray-300">
                  Get Updates
                </h3>
                <p className="text-sm dark:text-gray-400">
                  Stay updated on group activity with live notifications.
                  Monitor assignment submissions, grading progress, and other
                  key events to keep the momentum going.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
