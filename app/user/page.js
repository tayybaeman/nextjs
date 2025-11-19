"use client";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";
import { auth, db, storage } from "../lib/firebase";
import ProtectedRoute from "../components/ProtectedRoute";

// CV Template Component with Download
function CVTemplate({ isVisible, onClose }) {
  if (!isVisible) return null;

  const downloadCV = () => {
    // Create CV content as HTML
    const cvContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sample CV Template</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 3px solid #3B82F6; padding-bottom: 20px; margin-bottom: 20px; }
        .name { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
        .title { font-size: 18px; color: #3B82F6; margin-bottom: 15px; }
        .contact { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 20px; font-weight: bold; border-left: 4px solid #3B82F6; padding-left: 15px; margin-bottom: 15px; }
        .job { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .job-title { font-weight: bold; }
        .company { color: #3B82F6; font-weight: 600; }
        .date { background: #F3F4F6; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
        .skills { display: flex; flex-wrap: gap: 10px; }
        .skill { background: #DBEAFE; color: #1E40AF; padding: 8px 15px; border-radius: 20px; font-size: 14px; }
        ul { margin-left: 20px; }
        li { margin-bottom: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">JOHN SMITH</div>
        <div class="title">Senior Software Engineer</div>
        <div class="contact">
            <span>📧 john.smith@email.com</span>
            <span>📱 +1 (555) 123-4567</span>
            <span>🌐 linkedin.com/in/johnsmith</span>
            <span>📍 New York, NY</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">PROFESSIONAL SUMMARY</div>
        <p>Experienced Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams.</p>
    </div>

    <div class="section">
        <div class="section-title">EXPERIENCE</div>
        
        <div class="job">
            <div class="job-header">
                <div>
                    <div class="job-title">Senior Software Engineer</div>
                    <div class="company">Tech Solutions Inc.</div>
                </div>
                <div class="date">2021 - Present</div>
            </div>
            <ul>
                <li>Led development of microservices architecture serving 1M+ users</li>
                <li>Improved application performance by 40% through optimization</li>
                <li>Mentored 3 junior developers and conducted code reviews</li>
            </ul>
        </div>

        <div class="job">
            <div class="job-header">
                <div>
                    <div class="job-title">Full Stack Developer</div>
                    <div class="company">StartupCo</div>
                </div>
                <div class="date">2019 - 2021</div>
            </div>
            <ul>
                <li>Developed responsive web applications using React and Node.js</li>
                <li>Implemented RESTful APIs and database optimization</li>
                <li>Collaborated with design team to improve user experience</li>
            </ul>
        </div>
    </div>

    <div class="section">
        <div class="section-title">SKILLS</div>
        <div class="skills">
            <span class="skill">JavaScript</span>
            <span class="skill">React</span>
            <span class="skill">Node.js</span>
            <span class="skill">Python</span>
            <span class="skill">AWS</span>
            <span class="skill">Docker</span>
            <span class="skill">MongoDB</span>
            <span class="skill">PostgreSQL</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">EDUCATION</div>
        <div class="job-header">
            <div>
                <div class="job-title">Bachelor of Science in Computer Science</div>
                <div class="company">University of Technology</div>
            </div>
            <div class="date">2015 - 2019</div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">CERTIFICATIONS</div>
        <ul>
            <li>AWS Certified Solutions Architect (2022)</li>
            <li>Google Cloud Professional Developer (2021)</li>
            <li>Certified Scrum Master (2020)</li>
        </ul>
    </div>
</body>
</html>`;

    const blob = new Blob([cvContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Sample_CV_Template.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-xl font-bold text-gray-800">
            Sample CV Template
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={downloadCV}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📥 Download
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          {/* CV Template */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center border-b-2 border-blue-600 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                JOHN SMITH
              </h1>
              <p className="text-lg text-blue-600 font-medium mb-3">
                Senior Software Engineer
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span>📧 john.smith@email.com</span>
                <span>📱 +1 (555) 123-4567</span>
                <span>🌐 linkedin.com/in/johnsmith</span>
                <span>📍 New York, NY</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Experienced Software Engineer with 5+ years of expertise in
                full-stack development, specializing in React, Node.js, and
                cloud technologies. Proven track record of delivering scalable
                solutions and leading cross-functional teams.
              </p>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
                EXPERIENCE
              </h2>

              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Senior Software Engineer
                    </h3>
                    <p className="text-blue-600 font-medium">
                      Tech Solutions Inc.
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    2021 - Present
                  </span>
                </div>
                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                  <li>
                    • Led development of microservices architecture serving 1M+
                    users
                  </li>
                  <li>
                    • Improved application performance by 40% through
                    optimization
                  </li>
                  <li>
                    • Mentored 3 junior developers and conducted code reviews
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Full Stack Developer
                    </h3>
                    <p className="text-blue-600 font-medium">StartupCo</p>
                  </div>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    2019 - 2021
                  </span>
                </div>
                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                  <li>
                    • Developed responsive web applications using React and
                    Node.js
                  </li>
                  <li>• Implemented RESTful APIs and database optimization</li>
                  <li>
                    • Collaborated with design team to improve user experience
                  </li>
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "React",
                  "Node.js",
                  "Python",
                  "AWS",
                  "Docker",
                  "MongoDB",
                  "PostgreSQL",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
                EDUCATION
              </h2>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">
                    Bachelor of Science in Computer Science
                  </h3>
                  <p className="text-blue-600 font-medium">
                    University of Technology
                  </p>
                </div>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  2015 - 2019
                </span>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
                CERTIFICATIONS
              </h2>
              <ul className="text-gray-700 space-y-1">
                <li>• AWS Certified Solutions Architect (2022)</li>
                <li>• Google Cloud Professional Developer (2021)</li>
                <li>• Certified Scrum Master (2020)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Management Component
function ProfileSection({ userProfile, setUserProfile, currentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "userProfiles", currentUser.uid), {
        ...editedProfile,
        updatedAt: new Date().toISOString(),
      });
      setUserProfile(editedProfile);
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <div className="space-x-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              value={editedProfile.phone || ""}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, phone: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={editedProfile.location || ""}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, location: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter location"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <textarea
              value={editedProfile.summary || ""}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, summary: e.target.value })
              }
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write a brief professional summary..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={editedProfile.skills || ""}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, skills: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="JavaScript, React, Node.js, Python..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education
            </label>
            <textarea
              value={editedProfile.education || ""}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  education: e.target.value,
                })
              }
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Bachelor's in Computer Science - University Name (2019-2023)"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience
            </label>
            <textarea
              value={editedProfile.experience || ""}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  experience: e.target.value,
                })
              }
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Software Engineer at ABC Company (2021-2023)
- Developed web applications
- Led team of 3 developers"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ✏️ Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">
            Contact Information
          </h3>
          <div className="space-y-2 text-gray-600">
            <p>📧 {currentUser?.email}</p>
            <p>📱 {userProfile.phone || "Not provided"}</p>
            <p>📍 {userProfile.location || "Not provided"}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.skills ? (
              userProfile.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill.trim()}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-semibold text-gray-700 mb-2">
            Professional Summary
          </h3>
          <p className="text-gray-600">
            {userProfile.summary || "No summary provided"}
          </p>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-semibold text-gray-700 mb-2">Education</h3>
          <p className="text-gray-600 whitespace-pre-line">
            {userProfile.education || "No education information provided"}
          </p>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-semibold text-gray-700 mb-2">Experience</h3>
          <p className="text-gray-600 whitespace-pre-line">
            {userProfile.experience || "No experience information provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

function UserDashboard() {
  const { currentUser, userData } = useAuth();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showTemplate, setShowTemplate] = useState(false);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (currentUser) {
      fetchUserResumes();
      fetchUserProfile();
    }
  }, [currentUser]);

  const fetchUserProfile = async () => {
    try {
      const docRef = doc(db, "userProfiles", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchUserResumes = async () => {
    try {
      const q = query(
        collection(db, "resumes"),
        where("userId", "==", currentUser.uid),
        orderBy("uploadedAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const resumeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResumes(resumeList);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError("");

    // Validate file type - STRICT validation
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpg",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "❌ Format not supported! Please upload only PDF , Word , PNG , JPG , JPEG documents (.pdf, .doc, .docx , .png , .jpg , .jpeg)"
      );
      event.target.value = "";
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("❌ File size must be less than 5MB");
      event.target.value = "";
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create unique filename
      const timestamp = new Date().getTime();
      const fileName = `${currentUser.uid}_${timestamp}_${file.name}`;
      const storageRef = ref(storage, `resumes/${fileName}`);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Save resume metadata to Firestore
      await addDoc(collection(db, "resumes"), {
        userId: currentUser.uid,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        downloadURL: downloadURL,
        uploadedAt: new Date().toISOString(),
        status: "uploaded",
      });

      // Refresh resume list
      await fetchUserResumes();

      // Reset file input
      event.target.value = "";

      setError("");
      alert("✅ Resume uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setError("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                User Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {userData?.firstName} {userData?.lastName}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
                
            >
              👤 My Profile
            </button>
            <button
              onClick={() => setActiveTab("resumes")}
              className={`px-6 py-3 border-b-2 font-medium text-sm ${
                activeTab === "resumes"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
               Upload Resume📄
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === "profile" && (
          <ProfileSection
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            currentUser={currentUser}
          />
        )}

        {activeTab === "resumes" && (
          <>
            {/* Upload Section - Compact */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Upload Resume
                  </h2>
                  <p className="text-gray-600">
                    Upload your resume in PDF, Word , PNG , JPG & JPEG format
                    (Max: 5MB)
                  </p>
                </div>
                <button
                  onClick={() => setShowTemplate(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  👁️ View Sample CV
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <div className="mb-4">
                  <label
                    htmlFor="file-upload"
                    className={`cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
                      uploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {uploading ? "Uploading..." : "Upload Resume"}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </div>
                {uploading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Resume List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Uploaded Resumes
              </h2>
              {loading ? (
                <p className="text-gray-500">Loading resumes...</p>
              ) : resumes.length === 0 ? (
                <p className="text-gray-500">No resumes uploaded yet.</p>
              ) : (
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="bg-gray-100 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {resume.fileName}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Uploaded: {formatDate(resume.uploadedAt)} | Size:{" "}
                          {formatFileSize(resume.fileSize)}
                        </p>
                      </div>
                      <a
                        href={resume.downloadURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <CVTemplate
        isVisible={showTemplate}
        onClose={() => setShowTemplate(false)}
      />
    </div>
  );
}

export default function page() {
  return (
    //<ProtectedRoute requiredRole="user">
    <UserDashboard />
    //</ProtectedRoute>
  );
}
