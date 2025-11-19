'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaEye,
  FaEnvelope,
  FaCheckCircle,
  FaChartLine,
  FaSuitcase,
  FaUserCheck,
  FaUsers,
  FaUserCircle,
} from 'react-icons/fa';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sidebar
function Sidebar() {
  const [adminName, setAdminName] = useState('Admin');
  const [adminImage, setAdminImage] = useState('/images/admin.jpg');

  useEffect(() => {
    const storedName = localStorage.getItem('adminName');
    const storedImage = localStorage.getItem('adminImage');
    if (storedName) setAdminName(storedName);
    if (storedImage) setAdminImage(storedImage);
  }, []);

  return (
    <aside className="w-64 bg-gray-800 px-6 py-4 flex flex-col space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-bold text-blue-400">NextGen Resume</h2>
        <p className="text-xs text-gray-400">Admin Panel</p>
        <img
          src={adminImage}
          alt="Admin"
          className="w-20 h-20 mx-auto mt-3 rounded-full object-cover shadow-md"
        />
        <p className="text-sm font-semibold text-white mt-1">{adminName}</p>
      </div>
      <div className="space-y-2 text-sm">
        <MenuLink href="/admin" icon={<FaChartLine />} label="Dashboard" />
        <MenuLink href="/admin/index" icon={<FaEnvelope />} label="Inbox" />
        <MenuLink href="/admin/jobs" icon={<FaSuitcase />} label="Jobs" />
        <MenuLink href="/admin/candidates" icon={<FaUserCheck />} label="Candidates" />
        <MenuLink href="/admin/report" icon={<FaUsers />} label="Report" />
        <MenuLink href="/admin/profile" icon={<FaUserCircle />} label="Profile" />
      </div>
    </aside>
  );
}

function MenuLink({ href, icon, label }) {
  return (
    <Link href={href} className="flex items-center px-2 py-2 rounded hover:bg-blue-600 text-white transition">
      <span className="mr-2">{icon}</span>
      {label}
    </Link>
  );
}

// Dashboard
function DashboardSection() {
  const barData = {
    labels: ['Shortlisted', 'Rejected', 'Emails Sent'],
    datasets: [
      {
        label: 'Count',
        data: [32, 12, 45],
        backgroundColor: ['#2563EB', '#DC2626', '#FBBF24'],
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'CVs Analyzed',
        data: [12, 19, 30, 25, 40, 35, 50, 45],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold text-blue-800 flex items-center justify-center gap-2">
          <FaUserCheck className="text-blue-600" />
          Welcome to Admin Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<FaSuitcase className="text-blue-600 text-xl" />} label="Job Posts" value="3" />
        <StatCard icon={<FaEye className="text-green-600 text-xl" />} label="CVs Analyzed" value="78" />
        <StatCard icon={<FaCheckCircle className="text-purple-600 text-xl" />} label="Match Score" value="92%" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-md font-semibold text-gray-800 mb-2">Shortlist & Rejection</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-md font-semibold text-gray-800 mb-2">CVs Trend</h3>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <p className="text-sm text-gray-700">{label}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Dashboard Wrapper with logout
function AdminDashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-end mb-4">
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600">
            Logout
          </button>
        </div>
        <DashboardSection />
      </main>
    </div>
  );
}

// Export AdminPage
export default function AdminPage() {
  return <AdminDashboard />;
}
