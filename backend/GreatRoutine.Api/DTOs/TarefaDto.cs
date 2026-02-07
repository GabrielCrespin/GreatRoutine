using System.ComponentModel.DataAnnotations;

namespace GreatRoutine.Api.DTOs
{
    public class TarefaCreateDto
    {
        [Required]
        public string Titulo { get; set; }

        public string? Descricao { get; set; }

        [Required]
        public TimeSpan Horario { get; set; }
    }
}