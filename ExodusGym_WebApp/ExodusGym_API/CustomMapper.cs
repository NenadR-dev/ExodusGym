using ExodusGym_API.Model;
using ExodusGym_DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExodusGym_API
{
    public static class CustomMapper
    {
        public static Client MapToClient(ClientDTO clientDTO)
        {
            return new Client()
            {
                UserName = clientDTO.Username,
                FirstName = clientDTO.FirstName,
                Lastname = clientDTO.Lastname,
                DateOfBirth = clientDTO.DateOfBirth,
                ImageUrl = clientDTO.ImageUrl,
                Email = clientDTO.Email,
                MyAchivements = new Achievements(),
                Type = ExodusGym_DAL.Enums.ClientType.Regular
            };
        }
    }
}
