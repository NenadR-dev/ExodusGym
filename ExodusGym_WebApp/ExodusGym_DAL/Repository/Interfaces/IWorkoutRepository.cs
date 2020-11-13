using ExodusGym_DAL.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExodusGym_DAL.Repository.Interfaces
{
    public interface IWorkoutRepository : IRepository<Workout>
    {
        /// <summary>
        /// Connects Dates and Exercises from db and returns full workout
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Workout> GetWorkouts();

        public Workout RemoveDateFromWorkout(string Name, DateTime date);

        public Workout RemoveEntireWorkout(Workout workout);
    }
}
