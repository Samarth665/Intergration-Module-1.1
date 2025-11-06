using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Authenticate using email and plaintext password
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Username && u.Password == request.Password);

            if (user == null)
                return Unauthorized();

            // TODO: Generate token or session here (optional)
            return Ok(new { Message = "Login successful", username = user.FullName });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) ||
                string.IsNullOrEmpty(request.FullName) ||
                string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Please fill all required fields." });
            }

            bool userExists = await _context.Users.AnyAsync(u =>
                u.EmployeeId == request.EmployeeId || u.Email == request.Email);
            if (userExists)
            {
                return BadRequest(new { message = "User with this Employee ID or Email already exists." });
            }

            var user = new User
            {
                EmployeeId = request.EmployeeId,
                Email = request.Email,
                FullName = request.FullName,
                Password = request.Password  // store plaintext password (not recommended)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;  // Email in this context
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        public int EmployeeId { get; set; }  // int type as requested
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
