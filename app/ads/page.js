"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaGraduationCap,
  FaTools,
  FaClock,
} from "react-icons/fa";

// Firebase imports
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import Header from "../components/Header";

<Header />;
export default function AdvertisementPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase se jobs fetch karna
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "availableJobs"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const jobsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Sirf future deadlines wali jobs show karni hain
        const jobDeadline = data.deadline?.toDate();
        if (jobDeadline && jobDeadline > new Date()) {
          jobsData.push({
            id: doc.id,
            ...data,
            deadline: jobDeadline,
          });
        }
      });
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const timeDiff = deadline.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Compact Beautiful Header */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-white opacity-10 animate-bounce">
            <FaBriefcase className="text-4xl" />
          </div>
          <div className="absolute top-32 right-20 text-white opacity-10 animate-bounce animation-delay-1000">
            <FaUsers className="text-3xl" />
          </div>
          <div className="absolute bottom-20 left-20 text-white opacity-10 animate-bounce animation-delay-2000">
            <FaGraduationCap className="text-3xl" />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <div className="text-center text-white">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Icon and Title */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm border border-white border-opacity-30 shadow-xl">
                <FaBriefcase className="text-2xl text-white" />
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Career Opportunities
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto rounded-full"></div>
              </div>

              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Join our innovative team and shape the future with cutting-edge
                opportunities
              </p>

              {/* Compact Stats */}
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div className="flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white border-opacity-20">
                  <FaUsers className="text-green-300" />
                  <span className="text-blue-500 ">500+ Team</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white border-opacity-20">
                  <FaBriefcase className="text-yellow-300" />
                  <span className="text-blue-500">
                    {jobs.length} Open Roles
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white border-opacity-20">
                  <FaMapMarkerAlt className="text-purple-300" />
                  <span className="text-blue-500">Global Remote</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12"
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="rgb(239 246 255)"
            />
          </svg>
        </div>
      </div>

      {/* Compact Jobs Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaBriefcase className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                No Active Openings
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                Join our talent pool for future opportunities
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105">
                Join Talent Pool
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {jobs.map((job, index) => {
              const daysRemaining = getDaysRemaining(job.deadline);
              const isUrgent = daysRemaining <= 7;

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 border border-gray-100"
                >
                  {/* Compact Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <FaBriefcase className="text-lg" />
                      </div>
                      {isUrgent && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                          URGENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-1 line-clamp-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <FaCalendarAlt className="text-xs" />
                      <span>Deadline: {formatDate(job.deadline)}</span>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className="p-4 space-y-4">
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {job.description}
                    </p>

                    {/* Compact Requirements */}
                    <div className="space-y-2">
                      {job.experience && (
                        <div className="flex items-center gap-2 text-sm bg-blue-50 p-2 rounded-lg">
                          <FaClock className="text-blue-600 text-xs flex-shrink-0" />
                          <span className="text-gray-700 truncate">
                            {job.experience}
                          </span>
                        </div>
                      )}
                      {job.education && (
                        <div className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded-lg">
                          <FaGraduationCap className="text-green-600 text-xs flex-shrink-0" />
                          <span className="text-gray-700 truncate">
                            {job.education}
                          </span>
                        </div>
                      )}
                      {job.skills && (
                        <div className="flex items-center gap-2 text-sm bg-purple-50 p-2 rounded-lg">
                          <FaTools className="text-purple-600 text-xs flex-shrink-0" />
                          <span className="text-gray-700 truncate">
                            {job.skills}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          isUrgent
                            ? "bg-red-100 text-red-700"
                            : daysRemaining <= 14
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        <FaCalendarAlt />
                        {daysRemaining > 0
                          ? `${daysRemaining} days left`
                          : "Expired"}
                      </div>
                      <Link href="/login">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all transform hover:scale-105">
                          Apply Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Compact CTA */}
        {jobs.length > 0 && (
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 max-w-xl mx-auto border border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Don't see your perfect role?
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                We're always looking for exceptional talent
              </p>
              <Link href="/login">
                <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105">
                  Send Resume
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Your Company Name. Building the future together.
          </p>
        </div>
      </footer>
    </div>
  );
}
