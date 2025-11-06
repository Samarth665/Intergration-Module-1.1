using System.ComponentModel.DataAnnotations;

namespace EmployeeHub.Api.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string FullName { get; set; } = null!;

        [Required]
        public string EmployeeId { get; set; } = null!;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = null!;
    }
}
