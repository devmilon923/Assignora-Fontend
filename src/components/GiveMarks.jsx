import { Button, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAxios from "../services/useAxios";

export default function GiveMarks() {
  const { id } = useParams();
  const api = useAxios();
  const [btnLoading, setBtnLoading] = useState(false);
  const handleForm = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData.entries());
    try {
      await api.post(`/assignment/submit-marks/${id}`, object);
      e.target.reset();
      setBtnLoading(false);
      return toast.success("Marks submited");
    } catch (error) {
      setBtnLoading(false);
      console.log(error);
      return toast.error(error.response.data.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto border p-6 shadow-sm">
      <form onSubmit={handleForm} className="space-y-6">
        <div>
          <Label htmlFor="marks" value="Give marks" />
          <TextInput
            id="marks"
            name="givenMarks"
            className="mt-1"
            required
            type="number"
            placeholder="Write your desire mark"
          />
        </div>

        <div>
          <Label htmlFor="quick_note" value="Feedback" />
          <Textarea
            id="quick_note"
            className="mt-1"
            rows={4}
            name="feedback"
            required
            placeholder="Write a quick note here..."
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-700 mx-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white"
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
    </div>
  );
}
