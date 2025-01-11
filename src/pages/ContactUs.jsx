import React from "react";

export default function ContactUs() {
  const handleForm = async (e) => {
    e.preventDefault();
  };
  return (
    <section className="py-16 bg-gray-100 dark:bg-slate-800">
      <div className="container mx-auto px-3 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We'd love to hear from you! Whether you have a question or feedback,
            feel free to reach out to us using the form below.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
          <form onSubmit={handleForm}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-800 dark:text-gray-100 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-800 dark:text-gray-100 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="johndoe@example.com"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-800 dark:text-gray-100 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your message here..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn bg-neutral hover:bg-neutral-700 text-white mt-4 px-6 py-3 rounded-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
