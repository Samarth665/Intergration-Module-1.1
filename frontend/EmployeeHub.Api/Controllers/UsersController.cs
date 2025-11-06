using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EmployeeHub.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace EmployeeHub.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;

        public UsersController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var sub = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == JwtRegisteredClaimNames.Sub)?.Value;
            if (sub == null) return Unauthorized();

            if (!Guid.TryParse(sub, out var id)) return Unauthorized();

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound();

            return Ok(new {
                user.Id,
                user.FullName,
                user.EmployeeId,
            });
        }
    }
}
