using Backend_Rentify.Core.DataAccess;
using Backend_Rentify.Core.Entities;
using MongoDB.Driver;
using MongoDB.Driver.Linq;


namespace Backend_Rentify.Business.Services.Auth
{
    public class AuthBusinessService : IAuthBusinessService
    {
        private readonly IMongoDbContext _mongoDbContext;
        public AuthBusinessService(IMongoDbContext mongoDbContext) 
        {
            _mongoDbContext = mongoDbContext;
        }

        public async Task<bool> Register(UserEntity user)
        {
                if (await CheckUserExits(user.UserName, user.Email, user.Mobile))
                {
                    throw new Exception("User Already exist");
                }
                user.Id = Guid.NewGuid().ToString();
                await _mongoDbContext.Users.InsertOneAsync(user);
                return true;

        }

        private async Task<bool> CheckUserExits(string userName,string email,string mobile)
        {
            var user = await _mongoDbContext.Users.AsQueryable().Where(user => user.UserName == userName || user.Email == email || user.Mobile == mobile).FirstOrDefaultAsync();
            if (user != null)
            {
                return true;
            }
            return false;
        }
    }
}
