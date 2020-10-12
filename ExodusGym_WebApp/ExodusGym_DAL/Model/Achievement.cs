using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ExodusGym_DAL.Model
{
    public class Achievements
    {

        [ForeignKey("Client")]
        public string AchievementsID { get; set; }

        public virtual Client Client { get; set; }

        public int BenchPR { get; set; }
        public int DeadliftPR { get; set; }
        public int SquatPR { get; set; }
        public int TotalExercisesCompleted { get; set; }
        public int MoneySpent { get; set; }
        public int MoneySaved { get; set; }
        public int PromoCodesUsed { get; set; }
        public int TotalWeightLoss { get; set; }

    }
}
