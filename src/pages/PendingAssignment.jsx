import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import PendingCard from "../components/PendingCard";
import useAxios from "../services/useAxios";

export default function PendingAssignment() {
  const api = useAxios();
  const { isPending, data: pendingDatas } = useQuery({
    queryKey: ["pendingAssignment"],
    queryFn: async () => {
      const res = await api.get("/assignment/get/status/pending");
      return res.data.data || [];
    },
  });
  useEffect(() => {
    document.title = "Pending Assignment | Assignora";
  }, []);
  if (isPending)
    return (
      <div className="w-full  flex items-center justify-center">
        <img className="w-12" src="/loader.gif" alt="" />
      </div>
    );

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
      {pendingDatas.length ? (
        pendingDatas.map((pendingData) => (
          <PendingCard key={pendingData._id} pendingData={pendingData} />
        ))
      ) : (
        <span className="text-center md:col-span-3 col-span-1 dark:text-gray-300">
          No pending data found
        </span>
      )}
    </div>
  );
}
