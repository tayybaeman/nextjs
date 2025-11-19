"use client";

import {
  FaFileAlt,
  FaDownload,
  FaTimes,
  FaFilePdf,
  FaFileWord,
  FaInbox,
  FaFile,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function InboxPage() {
  const [cvs, setCvs] = useState([]);

  // Simulate dynamic fetch from /public/uploads
  useEffect(() => {
    // Replace this mock data with dynamic fetching in production
    setCvs([
      { 
        id: 1, 
        name: "Ali-Raza-CV.pdf", 
        uploadedBy: "Ali Raza", 
        type: "pdf",
        uploadDate: "2024-03-15",
        size: "2.3 MB"
      },
      { 
        id: 2, 
        name: "Fatima-Khan-CV.docx", 
        uploadedBy: "Fatima Khan", 
        type: "doc",
        uploadDate: "2024-03-14",
        size: "1.8 MB"
      },
      { 
        id: 3, 
        name: "Junaid-Profile.jpg", 
        uploadedBy: "Junaid", 
        type: "image",
        uploadDate: "2024-03-13",
        size: "856 KB"
      },
      { 
        id: 4, 
        name: "Sara-Resume.pdf", 
        uploadedBy: "Sara Ahmed", 
        type: "pdf",
        uploadDate: "2024-03-12",
        size: "1.9 MB"
      },
      { 
        id: 5, 
        name: "Hassan-CV.docx", 
        uploadedBy: "Hassan Ali", 
        type: "doc",
        uploadDate: "2024-03-11",
        size: "2.1 MB"
      },
    ]);
  }, []);

  const downloadAllAsCSV = () => {
    const csvHeader = "File Name,Uploaded By,Upload Date,File Size\n";
    const csvRows = cvs.map((cv) => `${cv.name},${cv.uploadedBy},${cv.uploadDate},${cv.size}`).join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "uploaded_cvs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (type, name) => {
    if (type === "pdf") return <FaFilePdf className="text-red-500 text-2xl" />;
    if (type === "doc") return <FaFileWord className="text-blue-600 text-2xl" />;
    if (type === "image")
      return (
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
          <FaFile className="text-white text-sm" />
        </div>
      );
    return <FaFileAlt className="text-gray-500 text-2xl" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFileTypeColor = (type) => {
    switch(type) {
      case 'pdf': return 'bg-red-100 text-red-700 border-red-200';
      case 'doc': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'image': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="relative mb-8">
          <button
            onClick={() => window.history.back()}
            className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-200 font-medium"
          >
            <FaTimes className="text-sm" /> Close
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <FaInbox className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              CV Inbox
            </h1>
            <p className="text-gray-600">
              Manage and download uploaded resumes
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaFile className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Files</p>
                <p className="text-2xl font-bold text-gray-800">{cvs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FaUsers className="text-emerald-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Candidates</p>
                <p className="text-2xl font-bold text-gray-800">{cvs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="text-amber-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-800">{cvs.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Files Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <FaFileAlt className="text-blue-600" /> 
                Uploaded Files
              </h2>
              
              {cvs.length > 0 && (
                <button
                  onClick={downloadAllAsCSV}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-colors shadow-md"
                >
                  <FaDownload className="text-sm" /> Export CSV
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">File</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Candidate</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cvs.map((cv, index) => (
                  <tr key={cv.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(cv.type, cv.name)}
                        <div>
                          <p className="font-medium text-gray-800 truncate max-w-[200px]">
                            {cv.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700 font-medium">{cv.uploadedBy}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm">{formatDate(cv.uploadDate)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm">{cv.size}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getFileTypeColor(cv.type)}`}>
                        {cv.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`/uploads/${cv.name}`}
                        download
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors w-fit"
                      >
                        <FaDownload className="text-xs" /> Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {cvs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaInbox className="text-gray-400 text-2xl" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No files received yet</p>
              <p className="text-gray-400 text-sm">Uploaded CVs will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}