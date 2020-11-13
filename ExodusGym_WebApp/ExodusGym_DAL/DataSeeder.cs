using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using ExodusGym_DAL.Enums;
using ExodusGym_DAL.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ExodusGym_DAL
{
    public class DataSeeder
    {
        public static async Task InitializeData(IServiceProvider _serviceProvider,AppDbContext _context)
        {
            Console.WriteLine("Seeding data");
            _context.Database.Migrate();
            //GENERATE ROLES AND USERS
            var _roleManager = _serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            if (!_context.Roles.Any(r => r.Name == UserRoles.Admin))
            {
                var store = new RoleStore<IdentityRole>(_context);
                var role = new IdentityRole { Name = UserRoles.Admin };
                await _roleManager.CreateAsync(role);
            }
            if (!_context.Roles.Any(r => r.Name == UserRoles.Instructor))
            {
                var store = new RoleStore<IdentityRole>(_context);
                var role = new IdentityRole { Name = UserRoles.Instructor };
                await _roleManager.CreateAsync(role);
            }
            if (!_context.Roles.Any(r => r.Name == UserRoles.Client))
            {
                var store = new RoleStore<IdentityRole>(_context);
                var role = new IdentityRole { Name = UserRoles.Client };
                await _roleManager.CreateAsync(role);
            }

            var userStore = new UserStore<AppUser>(_context);
            var userManager = _serviceProvider.GetRequiredService<UserManager<AppUser>>();

            if (!_context.Users.Any(x => x.UserName == "admin"))
            {
                var Admin = new AppUser()
                {
                    UserName = "admin",
                    //PasswordHash = AppUser.HashPassword("Admin123!"),
                    DateOfBirth = new DateTime(1996, 3, 5),
                    FirstName = "Nenad",
                    Lastname = "Radulovic",
                    ImageUrl = "",
                    Email = "admin@gmail.com"
                };
                await userManager.CreateAsync(Admin,"Admin123!");
                await userManager.AddToRoleAsync(Admin, UserRoles.Admin);
            }
            //POPULATE MEALS
            if(_context.MealDB.Count() == 0)
            {
                List<Meal> meals = new List<Meal>()
            {
                new Meal()
                {
                    Date = new DateTime(2020,11,17),
                    Description = "Omlete",
                    Calories = 150,
                    MealType = MealType.Breakfast
                },new Meal()
                {
                    Date = new DateTime(2020,11,14),
                    Description = "Chicken wings",
                    Calories = 320,
                    MealType = MealType.Lunch
                },new Meal()
                {
                    Date = new DateTime(2020,11,13),
                    Description = "Noodles",
                    Calories = 90,
                    MealType = MealType.Breakfast
                },new Meal()
                {
                    Date = new DateTime(2020,11,9),
                    Description = "Hot dog",
                    Calories = 190,
                    MealType = MealType.Dinner
                },new Meal()
                {
                    Date = new DateTime(2020,11,17),
                    Description = "Banana split",
                    Calories = 220,
                    MealType = MealType.Snack
                },new Meal()
                {
                    Date = new DateTime(2020,11,11),
                    Description = "Friend chicken",
                    Calories = 350,
                    MealType = MealType.Lunch
                }
            };
                _context.MealDB.AddRange(meals);
            }
            //POPULATE WORKOUTS
            if(_context.WorkoutDb.Count() == 0)
            {
                var workout = new Workout()
                {
                    Name = "MyWorkouts",
                    Description = "Home workout im doing in order to lose weight",
                    Duration = "30 minutes",
                    Intensity = "Begginer",
                    Sets = "3",
                    Type = WorkoutType.Individual,
                    Dates = new List<WorkoutDate>()
                    {
                        new WorkoutDate()
                        {
                            Date = new DateTime(2020,11,6)
                        },
                        new WorkoutDate()
                        {
                            Date = new DateTime(2020,11,9)
                        },
                        new WorkoutDate()
                        {
                            Date = new DateTime(2020,11,13)
                        },
                        new WorkoutDate()
                        {
                            Date = new DateTime(2020,11,16)
                        },
                        new WorkoutDate()
                        {
                            Date = new DateTime(2020,11,19)
                        },
                        new WorkoutDate()
                        {
                            Date = new DateTime(2020,11,23)
                        }
                    },
                    Exercises = new List<Exercise>()
                    {
                        new Exercise()
                        {
                            Interval = "10 reps",
                            Name = "Push-Ups"
                        },
                        new Exercise()
                        {
                            Interval = "20 secunds",
                            Name = "Plank"
                        },
                        new Exercise()
                        {
                            Interval = "15 reps",
                            Name = "Lunges"
                        },
                        new Exercise()
                        {
                            Interval = "20 reps",
                            Name = "Squats"
                        },
                        new Exercise()
                        {
                            Interval = "10 reps",
                            Name = "Sit-Ups"
                        }
                    }
                };
                _context.WorkoutDb.Add(workout);
            }
            _context.SaveChanges();
            Console.WriteLine("Seeding completed");
        }
    }
}
