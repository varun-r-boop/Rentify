using Backend_Rentify.Business.Enums;

namespace Backend_Rentify.Business.Models.Auth
{
    public class User
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserType UserType { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string ProfileLogoUrl { get; set; }
        public bool IsEmailVerified { get; set; }
    }
}
