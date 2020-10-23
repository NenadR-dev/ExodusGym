﻿using ExodusGym_DAL.Model;
using ExodusGym_DAL.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExodusGym_DAL.Repository
{
    public class WorkoutDayRepository : BaseRepository<WorkoutDay>, IWorkoutDayRepository
    {
        public WorkoutDayRepository(AppDbContext _context) : base(_context)
        {
        }
    }
}
