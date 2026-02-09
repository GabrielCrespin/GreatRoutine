import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './LoginStyle.css';

export default function Login({ setToken }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const res = await api.post('/auth/login', { email, senha });
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
        } catch (err) {
            setErro('Email ou senha inválidos');
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleLogin}>
                <h1>LOGIN</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />

                <button type="submit">Entrar</button>

                <span
                    className="login-link"
                    onClick={() => navigate('/register')}
                >
                    Cadastrar
                </span>

                {erro && <p className="login-error">{erro}</p>}
            </form>
        </div>
    );
}
