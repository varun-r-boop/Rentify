using Backend_Rentify.Business.Enums;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend_Rentify.Core.Entities
{
    [BsonIgnoreExtraElements]
    public class UserEntity
    {
        [BsonId]
        public string Id { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("userType")]
        public UserType UserType { get; set; }

        [BsonElement("emailId")]
        public string Email { get; set; }

        [BsonElement("mobile")]
        public string Mobile { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }

        [BsonElement("profileLogoUrl")]
        public string ProfileLogoUrl { get; set; }

        [BsonElement("isEmailVerified")]
        public bool IsEmailVerified { get; set; }

    }
}
