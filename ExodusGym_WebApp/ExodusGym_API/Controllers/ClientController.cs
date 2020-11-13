using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Permissions;
using System.Threading.Tasks;
using ExodusGym_API.Model;
using ExodusGym_BL;
using ExodusGym_BL.BL.Interfaces;
using ExodusGym_BL.Exceptions;
using ExodusGym_DAL;
using ExodusGym_DAL.Enums;
using ExodusGym_DAL.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace ExodusGym_API.Controllers
{
    [Route("api/Client")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientBL _clientBL;
        public ClientController(IClientBL clientBL)
        {
            _clientBL = clientBL;
        }

        [HttpGet, Route("GetWorkouts")]
        public IActionResult GetWorkouts()
        {
            var workouts = _clientBL.GetWorkouts();
            var retValue = new List<WorkoutDTO>();
            foreach (var node in workouts)
                retValue.Add(CustomMapper.MapToWorkoutDTO(node));
            return Ok(retValue);
        }

        [HttpPost, Route("CreateUserWorkout")]
        public IActionResult CreateUserWorkout(WorkoutDTO workoutDTO)
        {
            try
            {
                var retValue = _clientBL.CreateWorkout(CustomMapper.MapToWorkout(workoutDTO));
                return Created("CreateUserWorkout",CustomMapper.MapToWorkoutDTO(retValue));
            }
            catch(AddException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost, Route("AddUserWorkout")]
        public IActionResult AddUserWorkout(UserWorkoutDTO addUserWorkoutDTO)
        {
            try
            {
                var date = DateTime.ParseExact(addUserWorkoutDTO.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                var workout = _clientBL.AddWorkout(addUserWorkoutDTO.Name, date);
                return Created("AddUserWorkout",CustomMapper.MapToWorkoutDTO(workout));
            }
            catch(AddException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost, Route("PurchaseWorkout")]
        public IActionResult PurchaseWorkout(WorkoutDTO workoutDTO)
        {
            try
            {
                var retValue = _clientBL.PurchaseWorkout(CustomMapper.MapToWorkout(workoutDTO));
                return Created("PurchaseWorkout", CustomMapper.MapToWorkoutDTO(retValue));
            }
            catch(AddException e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost,Route("DeleteWorkout")]
        public IActionResult DeleteWorkout(UserWorkoutDTO userWorkoutDTO)
        {
            try
            {
                var target = _clientBL.DeleteWorkout(userWorkoutDTO.Name,DateTime.ParseExact(userWorkoutDTO.Date,"dd/MM/yyyy",CultureInfo.InvariantCulture));
                return Ok(CustomMapper.MapToWorkoutDTO(target));
            }
            catch(DeleteException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost, Route("DeleteMeal")]
        public IActionResult DeleteMeal(MealDTO meal)
        {
            try
            {
                var date = meal.Date.Replace('-', '/');
                meal.Date = DateTime.ParseExact(date,"MM/dd/yyyy",CultureInfo.InvariantCulture)
                                .ToString("dd/MM/yyyy");
                var retMeal = _clientBL.DeleteMeal(CustomMapper.MapToMeal(meal));
                return Ok(CustomMapper.MapToMealDTO(retMeal));
            }
            catch(DeleteException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost, Route("AddMeal")]
        public IActionResult AddMeal(MealDTO meal)
        {
            try
            {
                var retValue = _clientBL.AddMeal(CustomMapper.MapToMeal(meal));
                return Created("AddMeal", CustomMapper.MapToMealDTO(retValue));
            }
            catch(AddException e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet, Route("GetMeals")]
        public IActionResult GetMeals()
        {
            var mealsDTO = _clientBL.GetMeals();
            var meals = new List<MealDTO>();
            foreach (var node in mealsDTO)
                meals.Add(CustomMapper.MapToMealDTO(node));
            return Ok(meals);
        }

    }
}
