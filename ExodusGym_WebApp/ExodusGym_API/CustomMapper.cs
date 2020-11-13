using ExodusGym_API.Model;
using ExodusGym_DAL.Enums;
using ExodusGym_DAL.Model;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Globalization;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;

namespace ExodusGym_API
{
    public static class CustomMapper
    {
        public static WorkoutDTO MapToWorkoutDTO(Workout workout)
        {
            var dates = new List<string>();
            foreach (var node in workout.Dates)
                dates.Add(node.Date.ToString("MM-dd-yyyy"));
            var exercises = new List<ExerciseDTO>();
            foreach(var node in workout.Exercises)
                exercises.Add(new ExerciseDTO()
                {
                    Interval = node.Interval,
                    Name = node.Name
                });
            return new WorkoutDTO()
            {
                Description = workout.Description,
                Type = Enum.GetName(typeof(WorkoutType),workout.Type),
                Duration = workout.Duration,
                Name = workout.Name,
                Intensity = workout.Intensity,
                Sets = workout.Sets,
                Dates = dates,
                Exercises = exercises
            };
        }
        
        public static Workout MapToWorkout(WorkoutDTO workoutDTO)
        {
            var exercises = new List<Exercise>();
            var dates = new List<WorkoutDate>();
            foreach (var node in workoutDTO.Exercises)
                exercises.Add(new Exercise()
                {
                    Interval = node.Interval,
                    Name = node.Name
                });
            foreach(var node in workoutDTO.Dates)
            {
                var formatedDate = DateTime.ParseExact(node.Replace('-','/').Split(',')[0], "dd/MM/yyyy", CultureInfo.CurrentUICulture);
                dates.Add(new WorkoutDate()
                {
                    Date = formatedDate
                });
            }
            return new Workout()
            {
                Name = workoutDTO.Name,
                Description = workoutDTO.Description,
                Duration = workoutDTO.Duration,
                Intensity = workoutDTO.Intensity,
                Sets = workoutDTO.Sets,
                Type = (WorkoutType)Enum.Parse(typeof(WorkoutType), workoutDTO.Type),
                Dates = dates,
                Exercises = exercises
            };
        }

        public static Client MapToClient(ClientDTO clientDTO)
        {
            return new Client()
            {
                UserName = clientDTO.Username,
                FirstName = clientDTO.FirstName,
                Lastname = clientDTO.Lastname,
                DateOfBirth = clientDTO.DateOfBirth,
                ImageUrl = clientDTO.ImageUrl,
                Email = clientDTO.Email,
                MyAchivements = new Achievements(),
                Type = ExodusGym_DAL.Enums.ClientType.Regular
            };
        }
        public static Meal MapToMeal(MealDTO mealDTO)
        {
            //FORMAT DATE FROM DD-MM-YYYY TO MM-DD-YYYY
            //var date = mealDTO.Date.Replace('-', '/');
            return new Meal()
            {
                Date = DateTime.ParseExact(mealDTO.Date,"dd/MM/yyyy",CultureInfo.CurrentUICulture),
                Description = mealDTO.Description,
                Calories = mealDTO.Calories,
                MealType = (MealType)Enum.Parse(typeof(MealType), mealDTO.MealType)
            };
        }

        public static MealDTO MapToMealDTO(Meal meal)
        {

            return new MealDTO()
            {
                Date = meal.Date.ToString("MM-dd-yyyy"),
                Description = meal.Description,
                Calories = meal.Calories,
                MealType = Enum.GetName(typeof(MealType), meal.MealType)
            };
        }
    }
}
