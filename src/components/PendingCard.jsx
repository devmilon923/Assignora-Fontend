import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../services/useAuth";

export default function PendingCard({ pendingData }) {
  const { user } = useAuth();
  const { docsLink, quick_note } = pendingData || {};
  const { title, _id, marks } = pendingData.assignmentID || {};
  const { name, uid } = pendingData.user_id || {};

  return (
    <div>
      <div className="">
        <div className="card w-full dark:border-slate-950 dark:bg-slate-900 bg-white shadow-sm border rounded-md p-5">
          <div className="card-body p-0">
            <div className="flex items-center justify-between gap-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                <i className="fa-solid fa-check-to-slot text-green-500 mr-2 dark:text-gray-300"></i>
                {title}
              </h3>
              <Link to={`/assignments-details/${_id}`} title="View Assignment">
                <i className="fa-regular fa-eye text-slate-700 p-1 bg-slate-300 dark:bg-slate-200 dark:text-slate-700 hover:bg-green-300 rounded-full"></i>
              </Link>
            </div>
            <div className=" text-gray-700">
              <p className="text-sm dark:text-gray-400">
                <span className="font-bold">Examinee:</span> {name}
              </p>
              <p className="text-sm dark:text-gray-400">
                <span className="font-bold">Google Docs: </span>
                <a href={docsLink} target="_blank" className="text-blue-500 ">
                  View Document
                </a>
              </p>
              <p className="text-sm dark:text-gray-400">
                <span className="font-bold">Marks:</span> {marks}
              </p>

              <p className="text-sm font-bold dark:text-gray-400">
                Notes:{" "}
                <span className="font-normal  text-xs">
                  {quick_note ? quick_note : "N/A"}
                </span>{" "}
              </p>
            </div>
            {user?.uid === uid ? (
              <p className="text-red-500 cursor-not-allowed hover:bg-transparent hover:border-none bg-white border-white shadow-none dark:bg-slate-900 dark:border-slate-900 mt-1 btn btn-sm text-xs md:text-sm">
                [ You can't mark your own attempt ]
              </p>
            ) : (
              <Link
                to={`/marks/${pendingData._id}`}
                className="mt-1 btn btn-sm text-xs text-white  btn-success w-full"
              >
                Give Mark
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
