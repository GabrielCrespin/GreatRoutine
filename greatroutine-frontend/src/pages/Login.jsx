import { useState } from 'react';
import api from '../api/api';

export default function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await api.post('/auth/login', { email, senha });
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
        } catch (err){
            setErro('Email ou senha inválidos');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
            </form>
            {erro && <p style={{color: 'red'}}>{erro}</p>}
        </div>
    )
}