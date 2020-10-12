using ExodusGym_BL.BL.Interfaces;
using ExodusGym_BL.Exceptions;
using ExodusGym_DAL;
using ExodusGym_DAL.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ExodusGym_BL.BL
{
    public class AdminBL : IAdminBL
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserStore<AppUser> _userStore;
        private readonly AppDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        public AdminBL(IUnitOfWork unitOfWork, AppDbContext context, IServiceProvider _serviceProvider)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _userStore = new UserStore<AppUser>(_context);
            var userManager = _serviceProvider.GetRequiredService<UserManager<AppUser>>();
        }

        public async Task<bool> AddInstructor(AppUser user)
        {
            try
            {
                await _userManager.CreateAsync(user);
                await _userManager.AddToRoleAsync(user, "Instructor");
                return true;
            }
            catch(Exception e)
            {

                MethodBase methodBase = MethodBase.GetCurrentMethod();
                throw new AddException($"Error occured in: {methodBase.ReflectedType.Name}.{methodBase.Name}. {e.Message}");
            }
        }

        public bool DeleteInstructor(AppUser user)
        {
            throw new NotImplementedException();
        }

        public bool DeleteInstructor(string id)
        {
            throw new NotImplementedException();
        }

        public Client GetClient(string id)
        {
            throw new NotImplementedException();
        }

        public AppUser GetUser(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Client> ListClients()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<AppUser> ListInstructors()
        {
            throw new NotImplementedException();
        }
    }
}
