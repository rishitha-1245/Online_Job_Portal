// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';

const jobs = [
  { id: 1, title: "Frontend Dev", company: "TechNova", location: "Hyderabad" },
  { id: 2, title: "Backend Dev", company: "CodeCraft", location: "Bangalore" },
  { id: 3, title: "Data Analyst", company: "DataVerse", location: "Mumbai" },
  { id: 4, title: "UI/UX Designer", company: "PixelEdge", location: "Pune" },
  { id: 5, title: "DevOps Engg", company: "CloudBridge", location: "Chennai" },
  { id: 6, title: "Product Manager", company: "InnoTech", location: "Delhi" },
  { id: 7, title: "QA Tester", company: "TestLab", location: "Kolkata" },
  { id: 8, title: "Cybersecurity", company: "SecureNet", location: "Noida" },
  { id: 9, title: "App Dev", company: "Appify", location: "Ahmedabad" },
  { id: 10, title: "Full Stack Dev", company: "StackForge", location: "Jaipur" },
  { id: 11, title: "ML Engineer", company: "AIWorks", location: "Bhopal" },
];

const users = Array.from({ length: 120 });

const Navbar = ({ isAdmin }) => (
  <nav className="nav">
    <h2 className="logo">🌐 Job Portal</h2>
    <div>
      <Link to="/" className="link">Home</Link>
      <Link to="/jobs" className="link">Jobs</Link>
      {isAdmin ? <Link to="/admin" className="link">Admin Panel</Link> :
        <Link to="/admin-login" className="link">Admin</Link>}
    </div>
  </nav>
);

const Home = () => (
  <div className="centered">
    <marquee className="marquee">🌟 Welcome to India’s Smartest Job Portal – Where Careers Take Off! 🌟</marquee>
    <h1>🚀 About Us</h1>
    <p className="desc">
      We connect talent with top employers across India. Upload your resume and apply directly.
    </p>
    <div className="image-grid">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Interview" />
      <img src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png" alt="Resume" />
      <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="Teamwork" />
    </div>
  </div>
);

const JobApplyForm = ({ job, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", resume: null });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.mobile && form.resume) {
      setSuccess(true);
    }
  };

  return (
    <div className="popup">
      <h3>Apply for {job.title}</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
        <input type="file" onChange={(e) => setForm({ ...form, resume: e.target.files[0] })} />
        <button type="submit">Submit</button> <button type="button" onClick={onClose}>Cancel</button>
      </form>
      {success && <p>✅ Applied successfully!</p>}
    </div>
  );
};

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  return (
    <div className="centered">
      <h2>Available Jobs</h2>
      <div className="job-grid">
        {jobs.map((job) => (
          <div key={job.id} className="card">
            <h3>{job.title}</h3>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <button onClick={() => setSelectedJob(job)}>Apply</button>
          </div>
        ))}
      </div>
      {selectedJob && (
        <JobApplyForm job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

const AdminLogin = ({ setIsAdmin }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(""), [pass, setPass] = useState("");
  const login = (e) => {
    e.preventDefault();
    if (name === "admin" && pass === "admin123") {
      setIsAdmin(true);
      navigate("/admin");
    } else alert("❌ Invalid credentials");
  };
  return (
    <div className="centered">
      <h2>Admin Login</h2>
      <form onSubmit={login}>
        <input placeholder="Admin Name" onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
        <button>Login</button>
      </form>
    </div>
  );
};

const AdminPanel = () => (
  <div className="centered">
    <h2>Admin Panel</h2>
    <p>Total Registered Users: {users.length}</p>
    <p>Total Jobs Posted: {jobs.length}</p>
    <button onClick={() => alert("📊 Report Generated!")}>Generate Report</button>
  </div>
);

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <Router>
      <Navbar isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/admin" element={isAdmin ? <AdminPanel /> : <AdminLogin setIsAdmin={setIsAdmin} />} />
      </Routes>
    </Router>
  );
}
