import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import supabase from '../helper/supabaseClient';

const Home = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        toast.error("Google Sign-in failed. Please try again.");
      } else if (data?.url) {
        toast.info("Redirecting to Google Sign-in...");
      } else if (data.ok) {
        navigate('/dashboard');
        toast.success("Signed in successfully!");
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg text-center" style={{ width: '350px' }}>
        <h2 className="mb-4">Welcome to Chat App</h2>
        <p className="text-muted">Connect with friends and family.</p>
        
        <Link to={'/register'} className="btn btn-primary btn-block mb-2">Register</Link>
        <Link to={'/login'} className="btn btn-success btn-block mb-2">Login</Link>
        
        <div className="mt-3">
          <p className="text-muted">Or sign in with</p>
          <button className="btn btn-danger btn-block mb-2" onClick={signInWithGoogle}>Google</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
