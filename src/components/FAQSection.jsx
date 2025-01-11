import React from "react";

export default function FAQSection() {
  const faqData = [
    {
      question: "What is the purpose of this website?",
      answer:
        "This website allows users to create, complete, and evaluate group assignments in a collaborative environment. Every registered user can create and grade assignments for friends.",
    },
    {
      question: "Who can use this platform?",
      answer:
        "Anyone who registers can use the platform. All registered users are considered friends and can access shared assignments.",
    },
    {
      question: "Can I mark my own assignments?",
      answer:
        "No, you cannot mark your own assignments. You can only grade assignments submitted by other users.",
    },
    {
      question: "How do I filter assignments by difficulty level?",
      answer:
        "On the 'Assignments' page, use the filter dropdown to select the desired difficulty level (Easy, Medium, Hard).",
    },
    {
      question: "What happens if I reload a private route?",
      answer:
        "Logged-in users will remain on the same route. Unauthenticated users will be redirected to the login page.",
    },
    {
      question: "Do you offer any discounts or promotions?",
      answer:
        "We may offer discounts or promotions from time to time. To stay up-to-date on the latest deals and special offers, you can sign up for the company's newsletter or follow it on social media.",
    },
  ];
  return (
    <div>
      <div className="relative w-full bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm border rounded-md sm:px-6">
        <div className="mx-auto px-5">
          <div className="flex flex-col items-center">
            <h2 className="mt-5 dark:text-gray-400 text-center lg:text-3xl text-xl font-bold tracking-tight md:text-5xl">
              FAQ
            </h2>
            <p className="mt-3 text-sm text-neutral-500 md:text-md">
              Frequently asked questions
            </p>
          </div>

          <div className="mx-auto mt-8 grid  divide-y divide-neutral-200 dark:divide-slate-900">
            {faqData.map((item, index) => (
              <div className="py-5" key={index}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                    <span className="dark:text-white text-start">
                      {item.question}
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-neutral-600 dark:text-neutral-400">
                    {item.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
