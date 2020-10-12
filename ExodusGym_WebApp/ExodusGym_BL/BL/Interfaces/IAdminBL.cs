using ExodusGym_DAL.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ExodusGym_BL.BL.Interfaces
{
    public interface IAdminBL
    {
        Task<bool> AddInstructor(AppUser user);
        bool DeleteInstructor(AppUser user);
        bool DeleteInstructor(string id);
        IEnumerable<AppUser> ListInstructors();
        IEnumerable<Client> ListClients();
        AppUser GetUser(string id);
        Client GetClient(string id);

    }
}
