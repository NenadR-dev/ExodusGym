using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExodusGym_API.Model
{
    public class InstructorDTO
    {
        public string FirstName { get; set; }

        public string Lastname { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string NewPassword { get; set; }

        public string ImageUrl { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string Bio { get; set; }
    }
}
