using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using ExodusGym_API.Model;
using ExodusGym_DAL.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ExodusGym_API.Controllers
{
    [Route("api/Account"), AllowAnonymous]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signinManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signinManager = signInManager;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromForm]LoginModel loginModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var user = await _userManager.FindByNameAsync(loginModel.Username);

                if (user != null)
                {
                    if(user.UserName == loginModel.Username && AppUser.VerifyHashedPassword(user.PasswordHash, loginModel.Password) == PasswordVerificationResult.Success)
                    {
                        await _signinManager.SignInAsync(user, isPersistent: false, authenticationMethod: null);
                        return Ok("Signed in");
                    }
                    else
                    {
                        return BadRequest("Username / password does not match");
                    }
                }
                return NotFound();
            }
            catch(Exception e)
            {

                return NotFound(e.Message);
            }

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

    }
}
