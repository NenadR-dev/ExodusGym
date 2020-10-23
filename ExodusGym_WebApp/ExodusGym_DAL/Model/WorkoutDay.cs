using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ExodusGym_DAL.Model
{
    public class WorkoutDay
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public DateTime Date { get; set; }

        public virtual DietPlan DietPlan { get; set; }
    }
}
