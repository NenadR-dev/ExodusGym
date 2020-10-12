using ExodusGym_DAL.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExodusGym_API.Model
{
    public class ClientDTO : AppUserDTO
    {
        public int CurrentWeight { get; set; }
        public DateTime GymExpirationDate { get; set; }
        public bool IsActiveMember { get; set; }
        public ClientType Type { get; set; }
        public AchievementsDTO MyAchivements { get; set; }
    }
}
