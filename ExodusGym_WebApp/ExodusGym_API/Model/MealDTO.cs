using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ExodusGym_API.Model
{
    public class MealDTO
    {
        [JsonPropertyName("mealType")]
        public string MealType { get; set; }
        [JsonPropertyName("calories")]
        public int Calories { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("date")]
        public string Date { get; set; }

    }
}
