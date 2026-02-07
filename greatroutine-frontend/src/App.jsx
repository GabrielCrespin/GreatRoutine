import { useState } from 'react';
import Login from './pages/Login';
import Tarefas from './pages/Tarefas';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <Tarefas />;
}
