import { useQuery } from "@tanstack/react-query";
import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import { imageToUrl } from "../services/imageToUrl";
import useAxios from "../services/useAxios";

export default function UpdateAssignment() {
  const api = useAxios();
  const { id } = useParams();
  const [imageState, setImageState] = useState("Add Thumbnail URL");
  const [startDate, setStartDate] = useState(new Date());
  const { isPending, data: assignment } = useQuery({
    queryKey: ["myLoadSingel"],
    queryFn: async () => {
      const res = await api.get(`/assignment/get/my/${id}`);
      return res.data.data;
    },
  });
  useEffect(() => {
    document.title = "Update Assignment | Assignora";
  }, []);
  useEffect(() => {
    if (assignment?.dateline) {
      setStartDate(new Date(assignment.dateline));
    }
  }, [assignment, setStartDate]);
  if (isPending)
    return (
      <div className="w-full  flex items-center justify-center">
        <img className="w-12" src="/loader.gif" alt="" />
      </div>
    );
  if (!assignment) return <Navigate to={"/assignments"}></Navigate>;

  const handleForm = async (e) => {
    e.preventDefault();
    const now = new Date();
    if (startDate <= now) return toast.error("Due date must be in the future");
    // return console.log(e.target.photo.files?.size);
    const formData = new FormData(e.target);
    const FormObject = Object.fromEntries(formData.entries());
    if (e.target.photo.files.length <= 0) {
      const { photo, ...filterData } = FormObject;
      const data = {
        ...filterData,
        dateline: startDate,
        thumbnail: assignment.thumbnail,
        marks: parseInt(filterData.marks),
      };
      // return console.log(data);
      try {
        await api.post(`/assignment/update/${id}`, data);
        e.target.reset();

        return toast.success("Assignment updated");
      } catch (error) {
        console.log(error.message);
        return toast.success("Assignment not updated");
      }
    }

    const { photo, ...filterData } = FormObject;
    const url = await imageToUrl(e.target.photo.files[0]);
    const data = {
      ...filterData,
      dateline: startDate,
      thumbnail: url,
      marks: parseInt(filterData.marks),
    };
    // return console.log(data);
    try {
      await api.post(`/assignment/update/${id}`, data);
      e.target.reset();

      return toast.success("Assignment updated");
    } catch (error) {
      console.log(error.message);
      return toast.success("Assignment not updated");
    }

    // console.log(startDate);
  };
  return (
    <div className="">
      <div className="max-w-xl mx-auto mb-12 p-8 bg-white rounded-lg shadow-sm mt-10 border border-gray-200">
        {/* <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Assignment
        </h2> */}
        <form onSubmit={handleForm}>
          <div className="mb-3 text-center">
            <DatePicker
              showTimeSelect
              dateFormat="Pp"
              className="mx-auto rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              name="title"
              required
              defaultValue={assignment?.title}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="description">Description</Label>
            <TextInput
              id="description"
              name="description"
              defaultValue={assignment?.description}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="marks">Marks</Label>
            <TextInput
              id="marks"
              name="marks"
              type="number"
              defaultValue={assignment?.marks}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-6">
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-6 w-6 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">
                    {imageState}
                  </p>
                </div>
                <FileInput
                  id="dropzone-file"
                  onChange={(e) =>
                    e.target.files && setImageState("Photo accepted!")
                  }
                  name="photo"
                  className="hidden"
                />
              </Label>
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              id="difficulty"
              name="difficulty"
              defaultValue={assignment?.difficulty} // value প্রপ ব্যবহার করা হচ্ছে
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#155e75] hover:bg-[#1da1f2] text-white font-bold p-2 rounded-md transition duration-300"
          >
            Submit Assignment
          </Button>
        </form>
      </div>
    </div>
  );
}
