import {
  Button,
  FileInput,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { imageToUrl } from "../services/imageToUrl";
import useAxios from "../services/useAxios";

export default function CreateAssignment() {
  const api = useAxios();
  const [imageState, setImageState] = useState("Add Thumbnail URL");
  const [btnLoading, setBtnLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    document.title = "Create Assignment | Assignora";
  }, []);
  const handleForm = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const now = new Date();
    if (startDate <= now) {
      setBtnLoading(false);
      return toast.error("Due date must be in the future");
    }

    if (e.target.photo.files.length <= 0) {
      setBtnLoading(false);
      return toast.error("Image file is required!");
    }
    const formData = new FormData(e.target);
    const { photo, ...filterData } = Object.fromEntries(formData.entries());
    const url = await imageToUrl(e.target.photo.files[0]);

    const data = {
      ...filterData,
      dateline: startDate,
      thumbnail: url,
      marks: parseInt(filterData.marks),
    };
    try {
      await api.post("/assignment/create", data);
      e.target.reset();
      setStartDate(new Date());
      setBtnLoading(false);
      return toast.success("Assignment created");
    } catch (error) {

      setBtnLoading(false);
      return toast.success("Assignment not created");
    }
  };
  return (
    <div className="">
      <div className="max-w-xl mx-auto mb-12 p-8 bg-white dark:bg-slate-900 dark:border-slate-950 rounded-lg shadow-sm  border border-gray-200">
        {/* <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Assignment
        </h2> */}
        <form onSubmit={handleForm}>
          <div className="mb-3 text-center">
            <DatePicker
              showTimeSelect
              dateFormat="Pp"
              className="mx-auto dark:bg-slate-900 dark:text-gray-400 dark:border-slate-950 text-center rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              name="title"
              placeholder="Assinment name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              name="description"
              placeholder="Assinment description"
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
              placeholder="Assinment marks"
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
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="" disabled>
                Select Difficulty level
              </option>

              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full !bg-[#0e9f6e] hover:bg-[#0e9f9e] text-white font-bold p-2 rounded-md transition duration-300"
          >
            {btnLoading && (
              <Spinner
                aria-label="Alternate spinner button example"
                size="sm"
              />
            )}
            {/* <Spinner aria-label="Alternate spinner button example" size="sm" /> */}
            <span className="pl-3">Submit Data</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
