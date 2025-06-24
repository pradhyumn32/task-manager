import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tasks from './pages/Tasks';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState(token ? 'tasks' : 'login');

  const handleLogin = (tok) => {
    localStorage.setItem('token', tok);
    setToken(tok);
    setView('tasks');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('login');
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">📝 Task Manager</h1>
        {token && <button className="logout-btn" onClick={logout}>Logout</button>}
      </div>
      
      <div className="auth-view-container">
        {view === 'login' && <Login onLogin={handleLogin} switchToSignup={() => setView('signup')} />}
        {view === 'signup' && <Signup onSignup={handleLogin} switchToLogin={() => setView('login')} />}
      </div>
      
      {view === 'tasks' && <Tasks token={token} />}
    </div>
  );
}

export default App;