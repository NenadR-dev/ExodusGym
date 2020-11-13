using ExodusGym_DAL.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ExodusGym_DAL
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Client> ClientDb { get; set; }
        public DbSet<WorkoutDate> WorkoutDatesDb { get; set; }
        public DbSet<Workout> WorkoutDb { get; set; }
        public DbSet<Exercise> ExerciseDb { get; set; }
        public DbSet<Achievements> AchievementsDb { get; set; }
        public DbSet<AppUser> AppUserDB { get; set; }
        public DbSet<Meal> MealDB { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }

    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            Console.WriteLine("Creating Db Context");
            IConfigurationRoot Configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "/../ExodusGym_API/appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            var server = Configuration["DBServer"] ?? "localhost";
            var port = Configuration["DBPort"] ?? "1433";
            var user = Configuration["DBUser"] ?? "SA";
            var password = Configuration["DBPassword"] ?? "ExodusGym123!";
            var database = Configuration["Database"] ?? "ExodusGym";
            builder.UseSqlServer($"Server={server},{port};Initial Catalog={database};User Id={user};Password={password}");
            return new AppDbContext(builder.Options);
        }
    }
}

