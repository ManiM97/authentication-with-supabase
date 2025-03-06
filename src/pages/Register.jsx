import React, { useState } from 'react';
import supabase from '../helper/supabaseClient';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("User Account Created Successfully!");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '25rem' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type='email'
              className='form-control'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary w-100'>Create Account</button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <Link to='/login' className='text-primary'>Log in</Link></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
