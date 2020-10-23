using ExodusGym_DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ExodusGym_DAL.Model
{
    public class Meal
    {
        [ForeignKey("DietPlan")]
        public int MealID { get; set; }
        public virtual DietPlan DietPlan { get; set; }
        public int Calories { get; set; }
        public string Description { get; set; }
        public MealType MealType { get; set; }
    }
}
