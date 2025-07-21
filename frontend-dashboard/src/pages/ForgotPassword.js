import React, { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import axios from 'axios';

function ForgotPassword() {
  const { darkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      return setError('Please enter your email address.');
    }

    try {
      const res = await axios.post('http://localhost:5000/forgot-password', { email });
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div
        className={`card shadow-lg p-5 form-container ${darkMode ? 'bg-dark text-white' : ''}`}
        style={{ maxWidth: '500px', width: '100%' }}
      >
        <h2 className="text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
        </form>
        {message && (
          <div className="alert alert-info mt-3 text-center" role="alert">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3 text-center" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
