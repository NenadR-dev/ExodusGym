using ExodusGym_DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ExodusGym_DAL.Model
{
    public class Client : AppUser
    {
        public int CurrentWeight { get; set; }

        public DateTime GymExpirationDate { get; set; }

        public bool IsActiveMember { get; set; }

        public ClientType Type { get; set; }

        public virtual Achievements MyAchivements { get; set; }

        public Client()
        {
        }
    }
}
