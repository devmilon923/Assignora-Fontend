import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Label,
  Modal,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import useAuth from "../services/useAuth";
import useAxios from "../services/useAxios";

export default function AssignmentDetails() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const api = useAxios();
  const { id } = useParams();
  const { isPending, data: assignment } = useQuery({
    queryKey: ["loadSingel"],
    queryFn: async () => {
      const res = await api.get(`/assignment/get/${id}`);
      return res.data.data;
    },
  });
  if (isPending)
    return (
      <div className="w-full  flex items-center justify-center">
        <img className="w-12" src="/loader.gif" alt="" />
      </div>
    );
  if (!assignment) return <Navigate to={"/assignments"}></Navigate>;
  const handleForm = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData.entries());
    try {
      await api.post("/assignment/submit-attempt", {
        ...object,
        assignmentID: assignment._id,
      });
      e.target.reset();
      setBtnLoading(false);
      return toast.success("Your attempt submmited");
    } catch (error) {
      setBtnLoading(false);
      return toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
        <Modal.Header>Create an attempt</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleForm} className="space-y-6">
            <div>
              <Label htmlFor="URL" value="Google Docs" />
              <TextInput
                id="URL"
                name="docsLink"
                className="mt-1"
                type="url"
                required
                placeholder="Write google docs url here"
              />
            </div>

            <div>
              <Label htmlFor="quick_note" value="Quick Note" />
              <Textarea
                id="quick_note"
                className="mt-1"
                rows={4}
                name="quick_note"
                required
                placeholder="Write a quick note here..."
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white"
            >
              {btnLoading && (
                <Spinner
                  className="mr-1"
                  aria-label="Alternate spinner button example"
                  size="sm"
                />
              )}
              Submit Details
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="container max-w-xl mx-auto px-3 ">
        <div className="shadow-sm rounded-md border dark:border-slate-950 overflow-hidden">
          {/* Assignment Header */}
          <div className="flex items-center justify-between p-6 bg-gray-100 dark:bg-slate-800">
            <div className="flex items-center gap-4">
              <img
                src={assignment.owner?.photo}
                alt="Creator Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                  {assignment.title}
                </h2>
                <p className="text-gray-600 text-xs dark:text-gray-400">
                  Created by: <strong>{assignment.owner?.name}</strong>
                </p>

                <p className="text-gray-600 text-xs dark:text-gray-400">
                  Member since:{" "}
                  <strong>{assignment.owner?.createdAt.split("T")[0]}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Assignment Details */}
          <div className="p-6 dark:bg-slate-900">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Assignment Details
              </h3>

              {assignment.difficulty === "hard" ? (
                <p className="mt-2 inline-block py-1 px-2 text-xs font-medium text-slate-700 rounded-sm border bg-red-50 border-red-300">
                  Complicated
                </p>
              ) : assignment.difficulty === "medium" ? (
                <p className="mt-2 inline-block py-1 px-4 text-xs font-medium text-slate-700 rounded-sm border bg-yellow-50 border-yellow-300">
                  Moderate
                </p>
              ) : (
                assignment.difficulty === "easy" && (
                  <p className="mt-2 inline-block py-1 px-4 text-xs font-medium text-slate-700 rounded-sm border bg-green-50 border-green-300">
                    Straightforward
                  </p>
                )
              )}
            </div>

            {/* Created Date and Deadline */}
            <div className="">
              <p className="text-gray-600 text-sm dark:text-gray-400">
                Created On:{" "}
                <strong>{assignment.createdAt.split("T")[0]}</strong>
              </p>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                Deadline: <strong>{assignment.dateline.split("T")[0]}</strong>
              </p>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                Total Marks: <strong>{assignment.marks}</strong>
              </p>
            </div>
            {/* Assignment Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Description
              </h3>
              <p className="text-gray-600 mt-2 text-sm dark:text-gray-400">
                {assignment.description}
              </p>
            </div>
            {/* Action Buttons */}
            <div className="mt-6 flex justify-between gap-4 text-gray-600">
              {user?.uid === assignment.owner.uid ? (
                <p className="text-red-500 dark:text-red-400 mx-auto text-xs md:text-sm text-center">
                  You can't submit any attempt in your assignment
                </p>
              ) : (
                <div
                  onClick={() => setOpenModal(true)}
                  className="flex flex-grow btn dark:border-slate-900 bg-[#216996] hover:bg-[#1a4e75] items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-handshake  text-white cursor-pointer text-xl hover:text-white"></i>
                  <span className="text-sm text-white">Take assignment</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
