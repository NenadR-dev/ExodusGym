using Microsoft.AspNetCore.Identity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ExodusGym_DAL.Model
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string Lastname { get; set; }

        public string ImageUrl { get; set; }

        public DateTime? DateOfBirth { get; set; }

    }
}
