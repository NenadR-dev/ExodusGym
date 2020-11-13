using ExodusGym_DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ExodusGym_BL.BL.Interfaces
{
    public interface IClientBL : IDisposable
    {
        //MEALS
        public IEnumerable<Meal> GetMeals();

        public Meal AddMeal(Meal meal);

        public Meal DeleteMeal(Meal meal);
        //WORKOUTS
        public Workout PurchaseWorkout(Workout workout);
        public IEnumerable<Workout> GetWorkouts();
        public Workout DeleteWorkout(string Name, DateTime date);
        public Workout DeleteEntireWorkout(string Name);
        public Workout AddWorkout(string Name, DateTime Date);
        public Workout CreateWorkout(Workout workout);

    }
}
