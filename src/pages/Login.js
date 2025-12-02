import React, { useState } from 'react';
import { authApi, setToken } from '../services/api';

const Login = ({ onAuthSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please provide both email and password.');
      return;
    }

    if (!isLogin) {
      if (!formData.name || !formData.confirmPassword) {
        setError('Please fill in all required fields.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const payload = isLogin
        ? await authApi.login({
            email: formData.email.trim(),
            password: formData.password,
          })
        : await authApi.register({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          });

      setToken(payload.token);
      onAuthSuccess(payload);
      resetForm();
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="form-container">
      <h2 className="text-center">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
      <p className="text-center mb-4">
        {isLogin ? 'Sign in to your CareerStart account' : 'Join CareerStart and boost your career'}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Name field - shown in both but required only in signup */}
        <div className="form-group">
          <label>
            Your Name {!isLogin && '*'}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={isLogin ? "Enter your name" : "Enter your full name"}
            required={!isLogin}
          />
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
        )}

        {error && <div className="form-error">{error}</div>}

        <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={isSubmitting}>
          {isSubmitting ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="auth-switch text-center mt-4">
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a 
            onClick={() => {
              setIsLogin(!isLogin);
              resetForm();
              setError('');
            }} 
            className="form-link"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </a>
        </p>
      </div>

      <button 
        type="button" 
        className="btn btn-outline mt-4" 
        onClick={onBack} 
        style={{width: '100%'}}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Login;