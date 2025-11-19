"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FaComments,
  FaUser,
  FaEnvelope,
  FaTimes,
  FaArrowLeft,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";

const initialFeedbackList = [
  { id: 1, name: "Ali Raza", email: "ali@example.com", message: "The resume upload feature was smooth. Great UI!" },
  { id: 2, name: "Fatima Khan", email: "fatima@example.com", message: "I suggest adding a preview option before uploading." },
  { id: 3, name: "Zain Malik", email: "zain@example.com", message: "Excellent experience. Looking forward to more updates." },
  { id: 4, name: "Sara Ahmed", email: "sara@example.com", message: "Could be more user-friendly on mobile devices." },
  { id: 5, name: "Omar Siddiqui", email: "omar@example.com", message: "Love the speed and responsiveness. Keep it up!" },
  { id: 6, name: "Nadia Hussain", email: "nadia@example.com", message: "Add multi-language support please." },
];

export default function AdminInboxPage() {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState(initialFeedbackList);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const handleRemove = (id) => {
    const updated = feedbackList.filter((f) => f.id !== id);
    setFeedbackList(updated);
    if (currentPage > Math.ceil(updated.length / itemsPerPage)) setCurrentPage(currentPage - 1);
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredSortedList = useMemo(() => {
    let list = [...feedbackList];
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          f.email.toLowerCase().includes(term) ||
          f.message.toLowerCase().includes(term)
      );
    }
    if (sortField) {
      list.sort((a, b) => (a[sortField] < b[sortField] ? (sortOrder === "asc" ? -1 : 1) : a[sortField] > b[sortField] ? (sortOrder === "asc" ? 1 : -1) : 0));
    }
    return list;
  }, [feedbackList, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredSortedList.length / itemsPerPage);
  const currentPageData = filteredSortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
            <FaComments className="text-blue-600" />
            Feedback Inbox
          </h1>
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            <FaArrowLeft /> Close
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..."
            className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
          />
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-800">Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="p-1 border border-blue-300 rounded-md text-gray-800 placeholder-gray-500 text-sm"
            >
              {[2, 3, 5, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-12 gap-2 px-2 py-1 bg-gray-200 rounded  text-gray-800 text-sm font-semibold mb-2">
          <div className="col-span-3 cursor-pointer" onClick={() => toggleSort("name")}>
            Name {sortField === "name" && (sortOrder === "asc" ? <FaSortAlphaDown className="inline" /> : <FaSortAlphaUp className="inline" />)}
          </div>
          <div className="col-span-4 cursor-pointer text-gray-800" onClick={() => toggleSort("email")}>
            Email {sortField === "email" && (sortOrder === "asc" ? <FaSortAlphaDown className="inline" /> : <FaSortAlphaUp className="inline" />)}
          </div>
          <div className="col-span-4 text-gray-800">Message</div>
          <div className="col-span-1 text-center">✖</div>
        </div>

        {currentPageData.length === 0 ? (
          <p className="text-gray-600 mt-4">No feedback found.</p>
        ) : (
          currentPageData.map(({ id, name, email, message }) => (
            <div
              key={id}
              className="bg-white shadow-sm p-3 rounded-md mb-2 md:grid grid-cols-12 gap-2 items-center text-sm"
            >
              <div className="col-span-3 font-medium text-blue-700 flex items-center gap-1">
                <FaUser /> {name}
              </div>
              <div className="col-span-4 text-gray-600 flex items-center gap-1">
                <FaEnvelope /> {email}
              </div>
              <div className="col-span-4 text-gray-700">{message}</div>
              <div className="col-span-1 text-center">
                <button
                  onClick={() => handleRemove(id)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${currentPage === 1 ? "text-gray-400 border-gray-300" : "text-blue-600 border-blue-500 hover:bg-blue-100"}`}
            >
              Prev
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${currentPage === totalPages ? "text-gray-400 border-gray-300" : "text-blue-600 border-blue-500 hover:bg-blue-100"}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
