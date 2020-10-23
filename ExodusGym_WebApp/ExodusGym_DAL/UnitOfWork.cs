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

        public IWorkoutDayRepository WorkoutDay { get; set; }

        public UnitOfWork(
            AppDbContext context,
            IClientRepository client,
            IAchievementsRepository achievements,
            IWorkoutDayRepository workoutDay
            )
        {
            _context = context;
            Client = client;
            Achivemetns = achievements;
            WorkoutDay = workoutDay;
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
