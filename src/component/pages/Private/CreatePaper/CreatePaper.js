import React, { useState } from "react";
import "./CreatePaper.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Papa from "papaparse";
import { CSVLink } from "react-csv";

// Helper function to truncate comments
const truncateComment = (comment) => {
  const words = comment.split(" ");
  if (words.length > 20) {
    return `${words.slice(0, 9).join(" ")}...`;
  }
  return comment;
};

const CreatePaper = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const header = [
    { label: "Sr.no", key: "Sr.no" },
    { label: "Question", key: "Question" },
    { label: "Option A", key: "Option A" },
    { label: "Option B", key: "Option B" },
    { label: "Option C", key: "Option C" },
    { label: "Option D", key: "Option D" },
    { label: "Correct Answer", key: "Correct Answer" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log("Csv file data Fetched Successfully", result.data);
          setData(result.data);
          if (result.data.length > 0) {
            setHeaders(Object.keys(result.data[0])); // Dynamically setting headers
          }
        },
        header: true,
      });
    }
  };
  const triggerFileInput = () => {
    document.getElementById("fileInput").click(); // Trigger the file input click
  };

  return (
    <div className="p-6">
      {/* File input */}
      <input
        id="fileInput"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the input element
      />
      <Button
        className="btn btn-success me-2 mb-4"
        onClick={triggerFileInput}
        size="lg"
        block
      >
        Upload CSV File
      </Button>
      {/* Export Button */}
      <Button className="btn btn-primary mb-4" size="lg">
        <CSVLink
          data={data}
          headers={header}
          filename="mcq_questions.csv"
          className="text-white"
          block
        >
          Export Format
        </CSVLink>
      </Button>
      Table
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-green-500 text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left border-b text-center"
              >
                {header}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              {headers.map((header, idx) => (
                <td key={idx} className="px-4 py-2 border-b text-center">
                  {row[header]}
                </td>
              ))}
              <td className="px-4 py-2 border-b">
                <button> ⚔️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatePaper;
