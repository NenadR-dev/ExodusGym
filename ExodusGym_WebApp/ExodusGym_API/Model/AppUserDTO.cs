using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ExodusGym_API.Model
{
    public class AppUserDTO
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }
        [JsonPropertyName("firstname")]
        public string FirstName { get; set; }
        [JsonPropertyName("lastname")]
        public string Lastname { get; set; }
        [JsonPropertyName("username")]
        public string Username { get; set; }
        [JsonPropertyName("password")]
        public string Password { get; set; }
        [JsonPropertyName("newpassword")]
        public string NewPassword { get; set; }
        [JsonPropertyName("image")]
        public string ImageUrl { get; set; }
        [JsonPropertyName("date")]
        public DateTime? DateOfBirth { get; set; }
    }
}
