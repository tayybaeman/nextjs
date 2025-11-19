"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaSuitcase,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Firebase imports - apne path ke according adjust karein
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, storage } from '../../lib/firebase';


export default function JobPostingPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    experience: "",
    education: "",
    skills: "",
    deadline: null,
  });

  const [jobs, setJobs] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  // Firebase se jobs fetch karna
  const fetchJobs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "availableJobs"));
      const jobsData = [];
      querySnapshot.forEach((doc) => {
        jobsData.push({
          id: doc.id,
          ...doc.data(),
          deadline: doc.data().deadline?.toDate() // Firestore timestamp ko Date me convert
        });
      });
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
      alert("Error loading jobs!");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, deadline: date });
    setShowCalendar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.title.trim() || !form.description.trim() || !form.deadline || !form.experience.trim() || !form.education.trim() || !form.skills.trim()) {
      alert("Please fill all fields including requirements");
      setLoading(false);
      return;
    }

    try {
      if (form.id === null) {
        // Naya job add karna
        const docRef = await addDoc(collection(db, "availableJobs"), {
          title: form.title,
          description: form.description,
          experience: form.experience,
          education: form.education,
          skills: form.skills,
          deadline: form.deadline,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        
        alert("Job Posted Successfully!");
        console.log("Document written with ID: ", docRef.id);
      } else {
        // Existing job update karna
        const jobRef = doc(db, "availableJobs", form.id);
        await updateDoc(jobRef, {
          title: form.title,
          description: form.description,
          experience: form.experience,
          education: form.education,
          skills: form.skills,
          deadline: form.deadline,
          updatedAt: serverTimestamp()
        });
        
        alert("Job Updated Successfully!");
      }

      // Form reset aur jobs reload
      setForm({ id: null, title: "", description: "", experience: "", education: "", skills: "", deadline: null });
      fetchJobs();
      
    } catch (error) {
      console.error("Error saving job: ", error);
      alert("Error saving job!");
    }
    
    setLoading(false);
  };

  const handleEdit = (job) => {
    setForm({
      id: job.id,
      title: job.title,
      description: job.description,
      experience: job.experience || "",
      education: job.education || "",
      skills: job.skills || "",
      deadline: job.deadline,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteDoc(doc(db, "availableJobs", id));
        alert("Job deleted successfully!");
        fetchJobs(); // Jobs reload karna
      } catch (error) {
        console.error("Error deleting job: ", error);
        alert("Error deleting job!");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-16 px-4 text-gray-900">
      {/* Close Button */}
      <button
        onClick={() => router.push("/admin")}
        className="absolute top-5 right-5 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md shadow-md flex items-center justify-center"
        aria-label="Close"
      >
        <FaTimes size={18} />
      </button>

      {/* Form Container */}
      <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-10">
        <h1 className="text-2xl font-semibold text-blue-700 mb-5 flex items-center gap-2">
          <FaSuitcase /> Post or Manage Jobs
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Backend Developer"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Job responsibilities, role overview..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          {/* Requirements Section */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-1">Experience Required</label>
              <textarea
                name="experience"
                value={form.experience}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. 2+ years in React.js, 3+ years in Node.js..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-medium mb-1">Education Requirements</label>
              <textarea
                name="education"
                value={form.education}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. Bachelor's in Computer Science or equivalent..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-1">Required Skills</label>
            <textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. JavaScript, React.js, Node.js, MongoDB, Git..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium mb-1">Application Deadline</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={form.deadline ? new Date(form.deadline).toLocaleDateString() : ""}
                onClick={() => !loading && setShowCalendar(!showCalendar)}
                placeholder="Select deadline"
                className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
              {showCalendar && (
                <div className="absolute z-50 mt-1 shadow-lg rounded-md">
                  <Calendar
                    onChange={handleDateChange}
                    value={form.deadline || new Date()}
                    minDate={new Date()}
                    className="rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 justify-center w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-md font-semibold transition"
          >
            {loading ? (
              "Saving..."
            ) : form.id === null ? (
              <>
                <FaPlusCircle /> Post Job
              </>
            ) : (
              "Update Job"
            )}
          </button>
        </form>
      </section>

      {/* Job Listings */}
      <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Available Job Postings</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500 text-sm">No job postings available at the moment.</p>
        ) : (
          <ul className="space-y-6">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="border border-gray-300 rounded-md p-5 flex justify-between items-start"
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{job.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                  
                  {/* Requirements Display */}
                  <div className="grid md:grid-cols-3 gap-3 mb-3">
                    {job.experience && (
                      <div className="bg-blue-50 p-2 rounded-sm">
                        <span className="text-xs font-medium text-blue-700">Experience:</span>
                        <p className="text-xs text-gray-600 mt-1">{job.experience}</p>
                      </div>
                    )}
                    {job.education && (
                      <div className="bg-green-50 p-2 rounded-sm">
                        <span className="text-xs font-medium text-green-700">Education:</span>
                        <p className="text-xs text-gray-600 mt-1">{job.education}</p>
                      </div>
                    )}
                    {job.skills && (
                      <div className="bg-purple-50 p-2 rounded-sm">
                        <span className="text-xs font-medium text-purple-700">Skills:</span>
                        <p className="text-xs text-gray-600 mt-1">{job.skills}</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs font-medium text-gray-500">
                    Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'No deadline'}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleEdit(job)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Edit Job"
                    aria-label={`Edit ${job.title}`}
                    disabled={loading}
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete Job"
                    aria-label={`Delete ${job.title}`}
                    disabled={loading}
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}