using System.ComponentModel.DataAnnotations;

namespace GreatRoutine.Api.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Nome { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        
    }
}