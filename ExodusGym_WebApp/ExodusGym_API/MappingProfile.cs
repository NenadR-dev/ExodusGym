using AutoMapper;
using ExodusGym_API.Model;
using ExodusGym_DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExodusGym_API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Map from from DTO to DB object
            CreateMap<Client, ClientDTO>();
            CreateMap<Achievements, AchievementsDTO>();
        }
    }
}
