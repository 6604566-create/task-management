import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../../api/fetchClient";

import girlImg from "../../assets/sigin/signup.png";

/* ================= COMPONENT ================= */

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ CORRECT BACKEND ROUTE
      await fetchClient("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      alert("Registration successful 🎉");
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* LEFT */}
        <div style={styles.left}>
          <p style={styles.logo}>TASKFLOW</p>
          <p style={styles.welcome}>Create your account !!!</p>
          <h1 style={styles.heading}>Sign Up</h1>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>First Name</label>
            <input
              style={styles.input}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <label style={styles.label}>Last Name</label>
            <input
              style={styles.input}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? "Creating..." : "SIGN UP →"}
            </button>

            <p style={styles.footer}>
              Already have an account?{" "}
              <Link to="/" style={styles.link}>
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <img src={girlImg} alt="illustration" style={styles.image} />
        </div>
      </div>
    </div>
  );
}
