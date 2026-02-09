import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import Tarefas from './pages/Tarefas';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={
            token
              ? <Navigate to="/tarefas" />
              : <Login setToken={setToken} />
          }
        />

        {/* Cadastro */}
        <Route
          path="/register"
          element={
            token
              ? <Navigate to="/tarefas" />
              : <Register />
          }
        />

        {/* Tarefas (rota protegida) */}
        <Route
          path="/tarefas"
          element={
            token
              ? <Tarefas />
              : <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
