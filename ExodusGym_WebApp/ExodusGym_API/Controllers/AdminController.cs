using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ExodusGym_API.Model;
using ExodusGym_BL;
using ExodusGym_BL.BL.Interfaces;
using ExodusGym_BL.Exceptions;
using ExodusGym_DAL;
using ExodusGym_DAL.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExodusGym_API.Controllers
{
    [Route("api/Admin"), Authorize(Roles = "Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAdminBL _adminBL;
        public AdminController(IUnitOfWork unitOfWork, IMapper mapper, IAdminBL adminBL)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _adminBL = adminBL;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("DJE SI ADMINE BAJO");
        }

        [HttpPost]
        [Route("AddInstructor")]
        public async Task<IActionResult> AddInstructor([FromForm]InstructorDTO instructorDTO)
        {
            return Ok();
        }
    }
}
