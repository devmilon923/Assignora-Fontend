import React from "react";

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 dark:bg-slate-800 py-12 rounded-md">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          How It Works
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm p-6 w-full sm:w-72">
            <div className="text-4xl text-green-500 mb-4">📄</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Create Assignments
            </h3>
            <p className="text-gray-600 text-sm md:text-md dark:text-gray-300">
              Easily create and customize assignments for your group with
              structured tasks and deadlines.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm p-6 w-full sm:w-72">
            <div className="text-4xl text-green-500 mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Collaborate
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-md">
              Work together, share knowledge, and help each other grow in a
              supportive environment.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm p-6 w-full sm:w-72">
            <div className="text-4xl text-green-500 mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Grade and Improve
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-md">
              Provide constructive feedback and track progress using the
              collaborative grading system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
