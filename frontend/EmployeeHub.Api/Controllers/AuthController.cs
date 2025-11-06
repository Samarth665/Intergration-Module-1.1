using System.Threading.Tasks;
using EmployeeHub.Api.Data;
using EmployeeHub.Api.DTOs;
using EmployeeHub.Api.Models;
using EmployeeHub.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly JwtService _jwt;

        public AuthController(AppDbContext db, JwtService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _db.Users.AnyAsync(u => u.EmployeeId == dto.EmployeeId))
                return Conflict(new { message = "EmployeeId already exists" });

            var user = new User
            {
                FullName = dto.FullName,
                EmployeeId = dto.EmployeeId,
                PasswordHash = dto.Password  // plain text storage
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var token = _jwt.GenerateToken(user);
            return Ok(new UserDto { FullName = user.FullName, EmployeeId = user.EmployeeId, Token = token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.EmployeeId == dto.EmployeeId);

            // ✅ Debug log to see values
            Console.WriteLine($"DB Password: {user?.PasswordHash}, Input Password: {dto.Password}");

            if (user == null || user.PasswordHash != dto.Password)
                return Unauthorized(new { message = "Invalid credentials" });

            var token = _jwt.GenerateToken(user);
            return Ok(new UserDto { FullName = user.FullName, EmployeeId = user.EmployeeId, Token = token });
        }

    }
}
