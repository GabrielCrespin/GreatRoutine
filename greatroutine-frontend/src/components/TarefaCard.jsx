export default function TarefaCard({ tarefa, toggleConcluida, handleDelete }) {
  return (
    <div style={{
      border: '1px solid black',
      padding: '10px',
      margin: '5px',
      backgroundColor: tarefa.concluida ? 'lightgreen' : 'white'
    }}>
      <h3>{tarefa.titulo}</h3>
      <p>{tarefa.descricao}</p>
      <p>Horario: {tarefa.horario}</p>
      <button onClick={() => toggleConcluida(tarefa.id, tarefa.concluida)}>
        {tarefa.concluida ? 'Desmarcar' : 'Concluir'}
      </button>
      <button onClick={() => handleDelete(tarefa.id)}>Excluir</button>
    </div>
  );
}
