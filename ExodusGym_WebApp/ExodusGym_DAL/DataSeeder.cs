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
            //POPUlATING WORKOUT DAYS
            WorkoutDay workoutDay = new WorkoutDay()
            {
                Date = new DateTime(2020, 10, 10).Date,
                DietPlan = new DietPlan()
                {
                    Meals = new List<Meal>()
                    {
                        new Meal()
                        {
                            Calories = 150,
                            MealType = MealType.Breakfast,
                            Description = "Bacon and eggs"
                        },
                        new Meal()
                        {
                            Calories = 650,
                            Description = "BBQ Chicken wings with fries",
                            MealType = MealType.Lunch
                        },
                        new Meal()
                        {
                            Calories = 200,
                            Description = "Oatmeal with milk",
                            MealType = MealType.Dinner
                        },
                        new Meal()
                        {
                            Calories = 50,
                            Description = "BANANA",
                            MealType = MealType.Snack
                        }
                    }
                }
            };
            _context.WorkoutDayDB.Add(workoutDay);
            _context.SaveChanges();
            Console.WriteLine("Seeding completed");
        }
    }
}
