using Amazon.Runtime.Internal;
using Backend_Rentify.API.Helpers;
using Backend_Rentify.Business.Models.Auth;
using Backend_Rentify.Core.DataAccess;
using Backend_Rentify.Core.Entities;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Reflection;

namespace Backend_Rentify.Business.Services.Auth
{
    public class AuthBusinessService : IAuthBusinessService
    {
        private readonly IMongoDbContext _mongoDbContext;
        private readonly IJWTHelper _jwtHelper;
        public AuthBusinessService(IMongoDbContext mongoDbContext, IJWTHelper jwtHelper) 
        {
            _mongoDbContext = mongoDbContext;
            _jwtHelper = jwtHelper;
        }

        public async Task<bool> Register(UserEntity user)
        {
                if (await CheckUserExits(user.Email, user.Mobile))
                {
                    throw new Exception("User Already exist");
                }
                user.Id = Guid.NewGuid().ToString();
                //hash the password and save
                user.Password = HashPassword(user.Password);
                await _mongoDbContext.Users.InsertOneAsync(user);
                return true;

        }

        public async Task<string> Login(Login login)
        {
            var user = await GetUserByEmail(login.Email);
            User userModel = new User();
            userModel.Id = user.Id;
            userModel.Email = user.Email;
            userModel.UserType = user.UserType;
            userModel.FirstName = user.FirstName;
            userModel.Mobile = user.Mobile;
            if (!VerifyPasswordHash(user.Password, login.Password))
            {
                throw new Exception("Password is wrong");
            }
            return _jwtHelper.GenerateToken(userModel);
        }

        #region private methods
        private async Task<bool> CheckUserExits(string email,string mobile)
        {
            var user = await _mongoDbContext.Users.AsQueryable().Where(user =>user.Email == email || user.Mobile == mobile).FirstOrDefaultAsync();
            if (user != null)
            {
                return true;
            }
            return false;
        }
        
        private string HashPassword(string password)
        {
            var salt = BCrypt.Net.BCrypt.GenerateSalt(10);
            return BCrypt.Net.BCrypt.HashPassword(password, salt);
        }

        private bool VerifyPasswordHash(string hash, string password)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }

        private async Task<UserEntity> GetUserByEmail(string email)
        {
            return await _mongoDbContext.Users.AsQueryable().Where(user => user.Email == email).FirstOrDefaultAsync();
        }

        #endregion
    }
}
