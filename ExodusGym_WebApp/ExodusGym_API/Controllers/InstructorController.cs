using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExodusGym_API.Model;
using ExodusGym_BL;
using ExodusGym_BL.Exceptions;
using ExodusGym_DAL;
using ExodusGym_DAL.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExodusGym_API.Controllers
{
    [Route("api/Instructor")]
    [ApiController]
    public class InstructorController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public InstructorController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
    }
}
