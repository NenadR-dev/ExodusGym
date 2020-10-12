using ExodusGym_DAL.Repository;
using ExodusGym_DAL.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExodusGym_DAL
{
    public class UnitOfWork : IUnitOfWork
    {

        private readonly AppDbContext _context;
        public IClientRepository Client { get; set; }
        public IAchievementsRepository Achivemetns { get; set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Client = new ClientRepository(_context);
            Achivemetns = new AchievementsRepository(_context);
        }

        public int Commit()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
