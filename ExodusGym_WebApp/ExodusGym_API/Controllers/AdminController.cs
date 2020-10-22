using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExodusGym_API.Model;
using ExodusGym_BL;
using ExodusGym_BL.BL.Interfaces;
using ExodusGym_BL.Exceptions;
using ExodusGym_DAL;
using ExodusGym_DAL.Enums;
using ExodusGym_DAL.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ExodusGym_API.Controllers
{
    [Route("api/Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAdminBL _adminBL;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signinManager;
        public AdminController(IUnitOfWork unitOfWork, IAdminBL adminBL,
            UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _unitOfWork = unitOfWork;
            _adminBL = adminBL;
            //_userManager = userManager;
            //_signinManager = signInManager;
        }

        [HttpGet]
        [Route("TestA"), Authorize(Roles = UserRoles.Admin)]
        public IActionResult TestA()
        {
            return Ok("DJE SI ADMINE BAJO");
        }

        [HttpGet]
        [Route("TestB"), Authorize(Roles = UserRoles.Client)]
        public IActionResult TestB()
        {
            return Ok("DJE SI Anonime BAJO");
        }
        [HttpGet]
        [Route("TestC"), Authorize]
        public IActionResult TestC()
        {
            return Ok("DJE SI Anonime BAJO");
        }

        [HttpPost]
        [Route("AddInstructor")]
        public async Task<IActionResult> AddInstructor([FromForm]InstructorDTO instructorDTO)
        {
            return Ok();
        }
    }
}
