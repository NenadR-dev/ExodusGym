using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ExodusGym_API.Model;
using ExodusGym_DAL.Enums;
using ExodusGym_DAL.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace ExodusGym_API.Controllers
{
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signinManager;
        private readonly IConfiguration _config;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signinManager = signInManager;
            _config = config;
        }

        [HttpGet]
        [Route("Test"), Authorize(Roles ="Admin")]
        public IActionResult Test()
        {
            return Ok("DJE SI ADMINE BAJO");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }   
                
                var user = await _userManager.FindByNameAsync(loginModel.Username);

                if (user != null && await _userManager.CheckPasswordAsync(user,loginModel.Password))
                {
                    //var token = await GenerateJwtTokenAsync(user);
                    var success = await _signinManager.PasswordSignInAsync(user, loginModel.Password, false, false);
                    if (success.Succeeded)
                    {
                        return Ok("Signed in");
                        //var cookie = HttpContext.Response.Headers["Set-Cookie"];
                        //var cookieParts = cookie.ToString().Split('=');
                        //return Ok(new { message = "Logged In", Cookie = new { Name = cookieParts[0], Value = cookieParts[1].Split(' ')[0] } });
                        //return Ok(new { message = "Logged In", Cookie = cookie});
                    }

                    return BadRequest("Nece da se uloguje");

                }
                return NotFound();
            }
            catch(Exception e)
            {

                return NotFound(e.Message);
            }

        }

        [HttpGet]
        [Route("GetUserRole")]
        public async Task<IActionResult> GetUserRole()
        {
            var user = HttpContext.User.Claims.ToList().Find(x => x.Type == ClaimTypes.Role);
            if(user != null)
                return Ok(user.Value);
            return Ok("Anonymous");
        }

        private async Task<string> GenerateJwtTokenAsync(AppUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Sid, user.Id)
            };
            foreach(var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var algorithm = SecurityAlgorithms.HmacSha256;

            var signingCredintials = new SigningCredentials(key, algorithm);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signingCredintials
                );
            var tokenJson = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenJson;
        }

        [HttpGet]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signinManager.SignOutAsync();
            return Ok("Signed out");
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("HELLO");
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(ClientDTO clientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                Client client = CustomMapper.MapToClient(clientDto);
                var created = await _userManager.CreateAsync(client);
                if (created.Succeeded)
                {
                    await _userManager.AddToRoleAsync(client, UserRoles.Client);
                    return Created("User Created", client);
                }
                else
                {
                    return BadRequest(created.Errors);
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }          
        }
    }
}
