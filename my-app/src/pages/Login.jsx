import { useState } from 'react';
import { login } from '../api';
import './styles/Login.css';

export default function Login({ onLogin, switchToSignup }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.token) onLogin(res.token);
    else alert(res.error || 'Login failed');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
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
      <button type="submit">Login</button>
      <p>Don't have an account? <button type="button" onClick={switchToSignup}>Sign Up</button></p>
    </form>
  );
}