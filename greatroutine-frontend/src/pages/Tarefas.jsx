import { useState, useEffect } from 'react';
import api from '../api/api';
import TarefaCard from '../components/TarefaCard';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');

  const fetchTarefas = async () => {
    const res = await api.get('/tarefas');
    setTarefas(res.data);
  };

  const handleAdd = async () => {
    if (!titulo) return;
    await api.post('/tarefas', { titulo, horario: "12:00:00" });
    setTitulo('');
    fetchTarefas();
  };

  const toggleConcluida = async (id, concluida) => {
    await api.put(`/tarefas/${id}`, { concluida: !concluida });
    fetchTarefas();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tarefas/${id}`);
    fetchTarefas();
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  return (
    <div>
      <h1>Minhas Tarefas</h1>
      <input 
        type="text" 
        placeholder="Nova tarefa" 
        value={titulo} 
        onChange={e => setTitulo(e.target.value)} 
      />
      <button onClick={handleAdd}>Adicionar</button>

      <div>
        {tarefas.map(t => (
          <TarefaCard 
            key={t.id} 
            tarefa={t} 
            toggleConcluida={toggleConcluida} 
            handleDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
}
