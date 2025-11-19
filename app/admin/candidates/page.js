"use client";

import { useState } from "react";
import {
  FaUserCircle,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaSearch,
  FaStar,
} from "react-icons/fa";

export default function CandidatePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 3;

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Ayesha Khan",
      email: "ayesha.khan@example.com",
      position: "Frontend Developer",
      resume: "/resumes/ayesha-khan.pdf",
      status: "pending",
      matchScore: 82,
    },
    {
      id: 2,
      name: "Ali Raza",
      email: "ali.raza@example.com",
      position: "Backend Developer",
      resume: "/resumes/ali-raza.pdf",
      status: "shortlisted",
      matchScore: 91,
    },
    {
      id: 3,
      name: "Sara Malik",
      email: "sara.malik@example.com",
      position: "UI/UX Designer",
      resume: "/resumes/sara-malik.pdf",
      status: "rejected",
      matchScore: 68,
    },
    {
      id: 4,
      name: "Bilal Ahmed",
      email: "bilal.ahmed@example.com",
      position: "Fullstack Developer",
      resume: "/resumes/bilal-ahmed.pdf",
      status: "pending",
      matchScore: 75,
    },
    {
      id: 5,
      name: "Fatima Sheikh",
      email: "fatima.sheikh@example.com",
      position: "Data Scientist",
      resume: "/resumes/fatima-sheikh.pdf",
      status: "shortlisted",
      matchScore: 88,
    },
    {
      id: 6,
      name: "Hassan Ali",
      email: "hassan.ali@example.com",
      position: "DevOps Engineer",
      resume: "/resumes/hassan-ali.pdf",
      status: "pending",
      matchScore: 79,
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = candidates.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    setCandidates(updated);
  };

  const filtered = candidates
    .filter((c) =>
      [c.name, c.email, c.position]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "matchScore") return b.matchScore - a.matchScore;
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  const indexOfLast = currentPage * candidatesPerPage;
  const indexOfFirst = indexOfLast - candidatesPerPage;
  const currentCandidates = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / candidatesPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "shortlisted":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-blue-600";
    return "text-amber-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <button
            onClick={() => window.history.back()}
            className="absolute top-0 right-0 p-2 text-white hover:text-white bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200 shadow-lg"
            title="Close"
          >
            <FaTimes className="text-lg" />
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Candidate Management
          </h1>
          <p className="text-sm text-gray-600">
            Review and manage candidate applications
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white/70 backdrop-blur-sm placeholder-gray-600"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 backdrop-blur-sm min-w-[180px] text-gray-700"
            >
              <option value="name">Sort by Name</option>
              <option value="matchScore">Sort by Score</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            Showing {currentCandidates.length} of {filtered.length} candidates
          </p>
        </div>

        {/* Candidate Cards */}
        {currentCandidates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base">No candidates found</p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {currentCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Candidate Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative">
                      <FaUserCircle className="text-4xl text-blue-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800 text-base truncate">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {candidate.email}
                      </p>
                      <p className="text-sm text-gray-700 font-medium truncate">
                        {candidate.position}
                      </p>
                    </div>
                  </div>

                  {/* Status & Score */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          candidate.status
                        )}`}
                      >
                        {candidate.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className={`text-xs ${getMatchScoreColor(candidate.matchScore)}`} />
                      <span className={`text-sm font-semibold ${getMatchScoreColor(candidate.matchScore)}`}>
                        {candidate.matchScore}%
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <a
                      href={candidate.resume}
                      download
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-medium transition-colors"
                    >
                      <FaDownload className="text-xs" />
                      Resume
                    </a>
                    {candidate.status !== "shortlisted" && (
                      <button
                        onClick={() => handleStatusChange(candidate.id, "shortlisted")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-medium transition-colors"
                      >
                        <FaCheckCircle className="text-xs" />
                        Shortlist
                      </button>
                    )}
                    {candidate.status !== "rejected" && (
                      <button
                        onClick={() => handleStatusChange(candidate.id, "rejected")}
                        className="bg-rose-600 hover:bg-rose-700 text-white rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-medium transition-colors"
                      >
                        <FaTimesCircle className="text-xs" />
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}