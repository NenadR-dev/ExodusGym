using ExodusGym_BL.BL.Interfaces;
using ExodusGym_BL.Exceptions;
using ExodusGym_DAL;
using ExodusGym_DAL.Enums;
using ExodusGym_DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExodusGym_BL.BL
{
    public class ClientBL : IClientBL
    {
        private readonly IUnitOfWork _unitOfWork;
        public ClientBL(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Meal AddMeal(Meal meal)
        {
            var retMeal = _unitOfWork.Meal.Add(meal);
            var commits = _unitOfWork.Commit();
            if (commits > 0)
                return retMeal;
            else
                throw new AddException(string.Format("Could not add meal. Commits = {0}",commits));
        }

        public Workout PurchaseWorkout(Workout workout)
        {
            var retValue = _unitOfWork.Workout.Add(workout);
            if (retValue != null)
                return retValue;
            throw new AddException("Could not add workout.");
        }

        public Meal DeleteMeal(Meal meal)
        {
            var target = _unitOfWork.Meal.Get(x => x.Description == meal.Description && x.MealType == meal.MealType && x.Date == meal.Date).FirstOrDefault();
            var retValue = _unitOfWork.Meal.Delete(target.Id);
            if (retValue != null)
                return retValue;
            throw new DeleteException("Could not delete meal. Meal not found");
        }

        public void Dispose()
        {
            _unitOfWork.Commit();
        }

        public IEnumerable<Meal> GetMeals()
        {
            return _unitOfWork.Meal.GetAll();
        }

        public IEnumerable<Workout> GetWorkouts()
        {
            return _unitOfWork.Workout.GetWorkouts();
        }

        public Workout AddWorkout(string Name, DateTime Date)
        {
            var workout = _unitOfWork.Workout.GetWorkouts().ToList().Where(x => x.Name == Name).FirstOrDefault();
            workout.Dates.Add(new WorkoutDate()
            {
                Date = Date
            });
            if(_unitOfWork.Commit() > 0)
            {
                return workout;
            }
            else
            {
                throw new AddException(string.Format("Could not insert date in workout: [{0}]", Name));
            }
        }

        public Workout CreateWorkout(Workout workout)
        {
            var retValue = _unitOfWork.Workout.Add(workout);
            if (retValue != null)
            {
                _unitOfWork.Commit();
                return retValue;
            }
            else
            {
                throw new AddException(string.Format("Could not insert workout: [{0}]", workout.Name));
            }
        }

        public Workout DeleteWorkout(string Name, DateTime date)
        {
            var retValue = _unitOfWork.Workout.RemoveDateFromWorkout(Name, date);
            if (retValue != null)
            {
                _unitOfWork.Commit();
                return retValue;
            }
            else
            {
                throw new DeleteException(string.Format("Could not delete workout [{0}]. Workout is null", Name));
            }
        }

        public Workout DeleteEntireWorkout(string Name)
        {
            var workout = _unitOfWork.Workout.GetWorkouts().ToList().Find(x => x.Name == Name);
            if(workout != null)
            {
                var retValue = _unitOfWork.Workout.RemoveEntireWorkout(workout);
                _unitOfWork.Commit();
                return retValue;
            }
            else
            {
                throw new DeleteException(string.Format("Could not delete workout [{0}]. Workout is null", Name));
            }
        }
    }
}
