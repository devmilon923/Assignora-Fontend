import { Button, Modal, Spinner } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../services/useAuth";
import useAxios from "../services/useAxios";
import useData from "../services/useData";
export default function AssignmentCard({ assignment }) {
  const [openModal, setOpenModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const api = useAxios();
  const { user } = useAuth() || [];
  const { assignments, setAssignment } = useData();
  const { uid, name } = assignment.owner || {};
  const { dateline, difficulty, marks, title, thumbnail } = assignment;

  const handleDelete = async () => {
    setBtnLoading(true);
    try {
      const assignmentId = assignment._id;
      await api.get(`/assignment/delete/${assignment._id}`);
      const filterdData = assignments?.filter(
        (assing) => assing._id !== assignmentId
      );

      setAssignment(filterdData);
      setOpenModal(false);
      setBtnLoading(false);
      toast.success("Assignment deleted");
    } catch (error) {
      setBtnLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <div className="card rounded-md dark:border-slate-800  bg-green-500 dark:bg-slate-800 shadow-sm border  transform transition-all duration-300">
        <img
          src={thumbnail}
          alt="Assignment Thumbnail"
          className="w-full h-48  object-cover"
        />
        <div className="px-6 py-3 bg-white dark:bg-slate-900 ">
          <div>
            {difficulty === "hard" ? (
              <p className="mt-2 inline-block py-1 px-2 text-xs font-medium text-slate-700 rounded-sm border bg-red-50 border-red-300">
                Complicated
              </p>
            ) : difficulty === "medium" ? (
              <p className="mt-2 inline-block py-1 px-4 text-xs font-medium text-slate-700 rounded-sm border bg-yellow-50 border-yellow-300">
                Moderate
              </p>
            ) : (
              difficulty === "easy" && (
                <p className="mt-2 inline-block py-1 px-4 text-xs font-medium text-slate-700 rounded-sm border bg-green-50 border-green-300">
                  Straightforward
                </p>
              )
            )}
            <div>
              <h2 className="text-lg font-semibold pt-1 dark:text-gray-200 text-gray-600">
                {title}
              </h2>
              <p className="text-gray-600  text-sm dark:text-gray-400">
                Creator: <strong>{name}</strong>
              </p>
              <p className="text-gray-600  text-sm dark:text-gray-400">
                Marks: <strong>{marks}</strong>
              </p>

              {/* Deadline */}
              <p className=" text-sm text-gray-500 dark:text-gray-400">
                Deadline: <strong>{dateline.split("T")[0]}</strong>
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-between gap-4 flex-grow text-gray-600">
            {uid === user?.uid && (
              <div
                onClick={() => setOpenModal(true)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-trash text-red-400 cursor-pointer text-lg hover:text-red-500"></i>

                <span className="text-xs dark:text-gray-400">Delete</span>
              </div>
            )}
            {uid === user?.uid && (
              <Link
                to={`/assignments-update/${assignment._id}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-pen-to-square text-blue-300 cursor-pointer text-lg hover:text-blue-400"></i>

                <span className="text-xs dark:text-gray-400">Update</span>
              </Link>
            )}

            <NavLink
              to={`/assignments-details/${assignment._id}`}
              className="flex flex-grow btn btn-sm rounded-sm dark:border-slate-600 bg-green-100 dark:bg-green-900 dark:text-white hover:bg-gray-50 items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-eye text-green-500 cursor-pointer text-lg hover:text-green-700"></i>

              <span className="text-xs dark:text-gray-300">View More</span>
            </NavLink>
          </div>
        </div>
      </div>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {btnLoading && (
                  <Spinner
                    className="mr-1"
                    aria-label="Alternate spinner button example"
                    size="sm"
                  />
                )}
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
