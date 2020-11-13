using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ExodusGym_API.Model
{
    public class WorkoutDTO
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("duration")]
        public string Duration { get; set; }
        [JsonPropertyName("intensity")]
        public string Intensity { get; set; }
        [JsonPropertyName("sets")]
        public string Sets { get; set; }
        [JsonPropertyName("type")]
        public string Type { get; set; }
        [JsonPropertyName("dates")]
        public List<string> Dates { get; set; }
        [JsonPropertyName("exercises")]
        public List<ExerciseDTO> Exercises { get; set; }

    }
}
