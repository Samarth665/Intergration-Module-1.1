using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeHub.Api.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid(); // <-- ensures Id is always a UUID

        [Required]
        public string EmployeeId { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string PasswordHash { get; set; }
    }
}
