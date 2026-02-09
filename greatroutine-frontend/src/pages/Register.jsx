import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './RegisterStyle.css';

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      await api.post('/auth/register', {
        nome,
        email,
        senha,
      });

      setSucesso('Usuário cadastrado com sucesso!');

      setNome('');
      setEmail('');
      setSenha('');

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setErro(err.response?.data || 'Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Cadastro</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha (mín. 6 caracteres)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>

        {erro && <p className="error">{erro}</p>}
        {sucesso && <p className="success">{sucesso}</p>}

        <span className="link" onClick={() => navigate('/')}>
          Voltar para Login
        </span>
      </div>
    </div>
  );
}
