import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../services/useAxios";

export default function MyAttempted() {
  const api = useAxios();
  const { isPending, data } = useQuery({
    queryKey: ["my-attempt"],
    queryFn: async () => {
      const res = await api.get("/assignment/my-attempt");
      return res.data.data;
    },
  });
  useEffect(() => {
    document.title = "My Attempt | Assignora";
  }, []);
  if (isPending)
    return (
      <div className="w-full  flex items-center justify-center">
        <img className="w-12" src="/loader.gif" alt="" />
      </div>
    );

  return (
    <div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Assignment</Table.HeadCell>
            <Table.HeadCell>Docs link</Table.HeadCell>
            <Table.HeadCell>Obtained Marks</Table.HeadCell>
            <Table.HeadCell>Total Marks</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Feedback</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Show Details</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((attempt) => (
              <Table.Row
                key={attempt._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {attempt.assignmentID.title}
                </Table.Cell>
                <Table.Cell>
                  <a
                    className="text-blue-400 hover:underline"
                    href={attempt.docsLink}
                    target="_blank"
                  >
                    View Documment
                  </a>
                </Table.Cell>
                <Table.Cell>
                  {attempt.givenMarks ? attempt.givenMarks : "Not set"}
                </Table.Cell>
                <Table.Cell>{attempt.assignmentID.marks}</Table.Cell>
                <Table.Cell>
                  {attempt.status ? (
                    <span className="font-semibold text-green-500">
                      Completed
                    </span>
                  ) : (
                    <span className="font-semibold text-yellow-500">
                      Pending
                    </span>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {attempt.feedback ? attempt.feedback : "Not set"}
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/assignments-details/${attempt.assignmentID._id}`}
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Details
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
