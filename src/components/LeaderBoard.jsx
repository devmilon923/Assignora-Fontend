import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function LeaderBoard() {
  const { data: topUser, isPending } = useQuery({
    queryKey: "topUser",
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/assignment/top-user`
      );
      return res.data.data;
    },
  });
  if (isPending)
    return (
      <div className="w-full  flex items-center justify-center">
        <img className="w-12" src="/loader.gif" alt="" />
      </div>
    );
  return (
    <div>
      <section className="leaderboard bg-white dark:bg-gray-800 p-6 dark:border-slate-900 rounded-lg shadow-sm border">
        <h2 className="lg:text-2xl dark:text-gray-400 text-xl font-bold text-primary-800 mb-4 text-center">
          Leaderboard
        </h2>
        <ul>
          {topUser.length
            ? topUser.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-between py-2 border-b dark:border-b-slate-700"
                >
                  <span className="font-medium dark:text-gray-300 flex items-center gap-2">
                    <img
                      className="w-9 h-9 object-cover rounded-full"
                      src={
                        user.photo
                          ? user.photo
                          : "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
                      }
                      alt=""
                    />
                    {user.name}
                  </span>
                  <span className="text-green-500 flex items-center">
                    {user.totalMarks}
                  </span>
                </li>
              ))
            : "No user found"}
        </ul>
      </section>
    </div>
  );
}
