using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ExodusGym_DAL.Model
{
    public class DietPlan
    {

        [ForeignKey("WorkoutDay")]
        public int ID { get; set; }

        public virtual WorkoutDay WorkoutDay { get; set; }

        public int TotalCalories { get; private set; }
        public virtual ICollection<Meal> Meals { get; set; }
    }
}
