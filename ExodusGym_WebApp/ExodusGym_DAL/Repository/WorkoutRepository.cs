using ExodusGym_DAL.Model;
using ExodusGym_DAL.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ExodusGym_DAL.Repository
{
    public class WorkoutRepository : BaseRepository<Workout>, IWorkoutRepository
    {
        public WorkoutRepository(AppDbContext _context) : base(_context)
        {
        }

        public IEnumerable<Workout> GetWorkouts()
        {
            var workouts = Context.WorkoutDb.ToList();
            for(int i =0; i < workouts.Count; i++)
            {
                workouts[i].Exercises = Context.ExerciseDb.Where(x => x.Workout.ID == workouts[i].ID).ToList();
                workouts[i].Dates = Context.WorkoutDatesDb.Where(x => x.Workout.ID == workouts[i].ID).ToList();
            }
            return workouts;
        }

        public Workout RemoveDateFromWorkout(string Name, DateTime date)
        {
            var workout = Context.WorkoutDb.Where(x=> x.Name == Name).FirstOrDefault();
            var dates = Context.WorkoutDatesDb.Where(x=> x.Workout.ID == workout.ID).ToList();
            Context.WorkoutDatesDb.Remove(dates.Find(x => x.Date == date));
            dates.Remove(dates.Find(x => x.Date == date && x.Workout.ID == workout.ID));
            workout.Dates = dates;
            workout.Exercises = Context.ExerciseDb.Where(x => x.Workout.ID == workout.ID).ToList();
            return workout;
        }

        public Workout RemoveEntireWorkout(Workout workout)
        {
            var target = Context.WorkoutDb.Where(x => x.Name == workout.Name).FirstOrDefault();
            var dates = Context.WorkoutDatesDb.Where(x => x.Workout.ID == workout.ID).ToList();
            var exercises = Context.ExerciseDb.Where(x => x.Workout.ID == workout.ID).ToList();
            target.Exercises = exercises;
            target.Dates = dates;
            Context.WorkoutDatesDb.RemoveRange(dates);
            Context.ExerciseDb.RemoveRange(exercises);
            Context.WorkoutDb.Remove(target);
            return target;
        }
    }
}
