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
        public IWorkoutRepository Workout { get; set; }
        public IExerciseRepository Exercise { get; set; }
        public IMealRepository Meal { get; set; }

        public UnitOfWork(
            AppDbContext context,
            IClientRepository client,
            IAchievementsRepository achievements,
            IMealRepository meal,
            IWorkoutRepository workout,
            IExerciseRepository exercise
            )
        {
            _context = context;
            Client = client;
            Achivemetns = achievements;
            Meal = meal;
            Workout = workout;
            Exercise = exercise;
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
