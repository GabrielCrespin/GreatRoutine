using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreatRoutine.Api.Models
{
    public class Tarefa
    {
        public int Id { get; set; }

        [Required]
        public string Titulo { get; set; }
        
        public string? Descricao { get; set; }

        [Required]
        public TimeSpan Horario { get; set; }

        public bool Concluida { get; set; } 

        // CONTROLE DIÁRIO
        public DateTime? UltimaConclusao { get; set; }

        // RELAÇÃO COM O USUARIO
        public int UsuarioId { get; set; }

        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; }
    }
}