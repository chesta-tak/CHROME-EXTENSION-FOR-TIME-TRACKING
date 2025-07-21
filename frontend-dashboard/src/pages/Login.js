
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../App';

function Login() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const res = await axios.post('http://localhost:5000/login', formData);
    const token = res.data.token;

    // Save to localStorage
    localStorage.setItem('token', token);

    // ✅ Send token to Chrome Extension via content script bridge
console.log('Sending token via postMessage:', token); // <-- Add this line
window.postMessage(
  { type: 'saveToken', token },
  window.location.origin
);

    alert('Login successful!');
    navigate('/dashboard');
  } catch (err) {
    setServerError('Invalid email or password');
  }
};

  return (
   
    <div className="container d-flex align-items-center justify-content-center vh-100 border-radius-30px" >
      <div className={`card shadow-lg p-5 form-container ${darkMode ? 'bg-dark text-white' : ''}`} style={{ maxWidth: '600px', width: '100%', fontSize: '18px' }}>
        <h2 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-primary'}`} style={{ fontSize: '32px' }}>Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{ padding: '14px', fontSize: '17px' }}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{ padding: '14px', fontSize: '17px' }}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          {serverError && <div className="alert alert-danger">{serverError}</div>}
          <button type="submit" className="btn btn-primary w-100 mt-2" style={{ fontSize: '18px' }}>
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-decoration-none">Register</Link>
        </p>
        <p className="text-center mt-2">
          <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
