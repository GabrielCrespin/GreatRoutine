namespace GreatRoutine.Api.DTOs
{
    public class TarefaUpdateDto
    {
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        public TimeSpan? Horario { get; set; }
        public bool? Concluida { get; set; }
    }
}