import React from "react";

export default function LeaderBoard() {
  return (
    <div>
      <section className="leaderboard bg-white dark:bg-gray-800 p-6 dark:border-slate-900 rounded-lg shadow-sm border">
        <h2 className="lg:text-2xl dark:text-gray-400 text-xl font-bold text-primary-800 mb-4 text-center">
          Leaderboard
        </h2>
        <ul>
          <li className="flex justify-between py-2 border-b dark:border-b-slate-700">
            <span className="font-medium dark:text-gray-300">Amelia Rose</span>
            <span className="text-green-500">95%</span>
          </li>
          <li className="flex justify-between py-2 border-b dark:border-b-slate-700">
            <span className="font-medium dark:text-gray-300">Jane Smith</span>
            <span className="text-green-500">93%</span>
          </li>
          <li className="flex justify-between py-2 border-b dark:border-b-slate-700">
            <span className="font-medium dark:text-gray-300">Daisy Jade</span>
            <span className="text-green-500">92%</span>
          </li>
          <li className="flex justify-between py-2 border-b dark:border-b-slate-700">
            <span className="font-medium dark:text-gray-300">Fern Dell</span>
            <span className="text-green-500">91%</span>
          </li>
          <li className="flex justify-between py-2 border-b dark:border-b-slate-700">
            <span className="font-medium dark:text-gray-300">Laura Beth</span>
            <span className="text-green-500">89%</span>
          </li>
          <li className="flex justify-between py-2 border-b dark:border-b-slate-700">
            <span className="font-medium dark:text-gray-300">Harper Lynn</span>
            <span className="text-green-500">88%</span>
          </li>
          <li className="flex justify-between py-2">
            <span className="font-medium dark:text-gray-300">Olive Ann</span>
            <span className="text-green-500">86%</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
