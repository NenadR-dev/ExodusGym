using ExodusGym_DAL.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExodusGym_DAL
{
    public interface IUnitOfWork : IDisposable
    {
        IAchievementsRepository Achivemetns { get; }
        IClientRepository Client { get; }
        IWorkoutRepository Workout { get; }
        IExerciseRepository Exercise { get; }
        IMealRepository Meal { get; set; }

        int Commit();
    }
}
