import { useQuery } from "@tanstack/react-query";
import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import AssignmentCard from "../components/AssignmentCard";
import useAuth from "../services/useAuth";
import useAxios from "../services/useAxios";
import useData from "../services/useData";

export default function Assignments() {
  const {} = useAuth();
  const api = useAxios();
  const searchRef = useRef();
  const { assignments, setAssignment } = useData();
  const [searchLoading, setSearchLoading] = useState(false);
  const { isPending, data } = useQuery({
    queryKey: ["allAssignment"],
    queryFn: async () => {
      const res = await api.get("/assignment/get");
      return res.data.data;
    },
  });
  useEffect(() => {
    document.title = "Assignment | Assignora";
  }, []);
  useEffect(() => {
    if (data) {
      setAssignment(data);
    } else {
      setAssignment([]);
    }
  }, [data, setAssignment]);
  if (isPending)
    return (
      <div className="w-full  flex items-center justify-center">
        <img className="w-12" src="/loader.gif" alt="" />
      </div>
    );

  const handleSearch = async () => {
    setSearchLoading(true);
    if (searchRef.current.value.trim() === "") {
      return setSearchLoading(false);
    }
    try {
      const res = await api.get(
        `/assignment/search/${searchRef.current.value}`
      );
      setSearchLoading(false);
      return setAssignment(res.data.data);
    } catch (error) {
      return setSearchLoading(false);
    }
  };
  const difficultSearch = async (e) => {
    setSearchLoading(true);
   
    try {
      const res = await api.get(
        `/assignment/search/difficulty/${e.target.value}`
      );
      setSearchLoading(false);
      return setAssignment(res.data.data);
    } catch (error) {
      return setSearchLoading(false);
  
    }
  };
  return (
    <div>
      <div className="bg-gray-100 dark:bg-slate-900 p-4  rounded-sm">
        <div className="lg:w-1/3 mx-auto grid grid-cols-1 items-center gap-2 ">
          <div className="flex items-center justify-center gap-4">
            <TextInput ref={searchRef} type="text" placeholder="Search..." />{" "}
            <Button onClick={handleSearch}>Search</Button>
          </div>
          <Select
            onChange={difficultSearch}
            id="difficulty"
            required
            className="mt-1 block w-full  rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="" disabled selected>
              Select Difficulty level
            </option>

            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </div>
      </div>
      <div className="divider"></div>
      <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1">
        {searchLoading ? (
          <div className="w-full col-span-3 flex items-center justify-center">
            <img className="w-12" src="/loader.gif" alt="" />
          </div>
        ) : assignments.length ? (
          assignments.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))
        ) : (
          <span className="col-span-3 text-center dark:text-gray-400">
            No Data Found
          </span>
        )}
      </div>
    </div>
  );
}
