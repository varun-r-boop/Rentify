using Backend_Rentify.Business.Enums;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend_Rentify.Business.Models
{
    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserType UserType { get; set; }
        public string Email { get; set; }
        public string ProfileLogoUrl { get; set; }
        public bool IsEmailVerified { get; set; }
    }
}
