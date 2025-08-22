using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ContactApi.Api
{

    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public ActionResult<AuthenticateResponse> Authenticate([FromBody] AuthenticateRequest request)
        {
            // 1) Valida credenciales (ejemplo mínimo)
            // Reemplaza esto por tu lógica real (DB, Identity, etc.)
            if (!IsValidUser(request.Username, request.Password, out var role))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            // 2) Genera JWT
            var jwtSection = _config.GetSection("Jwt");
            var issuer = jwtSection["Issuer"];
            var audience = jwtSection["Audience"];
            var key = jwtSection["Key"];
            var expireMinutes = int.TryParse(jwtSection["ExpireMinutes"], out var m) ? m : 60;

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, request.Username),
                new(JwtRegisteredClaimNames.UniqueName, request.Username),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(ClaimTypes.Name, $"{request.Username} -- LastName"),
                new(ClaimTypes.Role, role) // opcional: role
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!));
            var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var expires = DateTime.UtcNow.AddMinutes(expireMinutes);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: expires,
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new AuthenticateResponse(tokenString, expires));
        }

        private static bool IsValidUser(string username, string password, out string role)
        {
            // Demo: usuario/clave fija
            if (username == "admin" && password == "admin")
            {
                role = "Administrator";
                return true;
            }

            if (username == "user" && password == "123456")
            {
                role = "User";
                return true;
            }

            if (username == "ricki" && password == "medina")
            {
                role = "User";
                return true;
            }

            role = "User";
            return false;
        }
    }
}