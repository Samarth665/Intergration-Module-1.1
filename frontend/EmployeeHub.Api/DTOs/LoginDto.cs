using System.ComponentModel.DataAnnotations;

namespace EmployeeHub.Api.DTOs
{
    public class LoginDto
{
    public string EmployeeId { get; set; }
    public string Password { get; set; }
}

}
