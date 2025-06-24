const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

export const signup = async (userData) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const text = await res.text(); // read full response
  console.log('Signup response:', res.status, text);

  if (!res.ok) throw new Error(`Signup failed (${res.status})`);
  
  return JSON.parse(text); // if successful, parse as JSON
};



export const login = async (form) =>
  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  }).then(res => res.json());

export const getTasks = async (token) =>
  fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

export const addTask = async (form, token) =>
  fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(form)
  }).then(res => res.json());

export const updateTask = async (id, status, title, token) => {
  const body = {};
  if (status !== null) body.status = status;
  if (title !== null) body.title = title;

  return fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }).then(res => {
    if (!res.ok) throw new Error(`Failed to update task: ${res.status}`);
    return res.json();
  });
};


  export const deleteTask = async (id, token) =>
  fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
