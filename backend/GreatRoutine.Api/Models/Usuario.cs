using System.ComponentModel.DataAnnotations;

namespace GreatRoutine.Api.Models
{
    public class Usuario
    {
        public int Id {get; set;}
        [Required]
        public string Nome{get; set;}
        [Required]
        public string Email{get; set;} = string.Empty;
        [Required]
        public string Senha{get; set;} = string.Empty;
    }
}