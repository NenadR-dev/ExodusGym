using ExodusGym_DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ExodusGym_DAL.Model
{
    public class Workout
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Intensity { get; set; }
        public string Duration { get; set; }
        public string Sets { get; set; }
        public virtual ICollection<WorkoutDate> Dates { get; set; }
        public WorkoutType Type { get; set; }
        public virtual ICollection<Exercise> Exercises { get; set; }
    }
}
