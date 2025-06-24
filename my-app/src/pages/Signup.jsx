import { useState } from 'react';
import { signup } from '../api';
import './styles/Signup.css';

export default function Signup({ onSignup, switchToLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (res.token) onSignup(res.token);
    else alert(res.error || 'Signup failed');
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      <input 
        placeholder="Name" 
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} 
        required 
      />
      <input 
        placeholder="Email" 
        type="email" 
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} 
        required 
      />
      <input 
        placeholder="Password" 
        type="password" 
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} 
        required 
      />
      <button type="submit">Sign Up</button>
      <p>Already have an account? <button type="button" onClick={switchToLogin}>Login</button></p>
    </form>
  );
}