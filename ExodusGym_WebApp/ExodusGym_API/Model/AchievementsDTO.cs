using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExodusGym_API.Model
{
    public class AchievementsDTO
    {
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
