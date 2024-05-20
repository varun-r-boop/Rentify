using Backend_Rentify.API.Helpers;
using Backend_Rentify.Business.Services.Auth;
using Backend_Rentify.Core.DataAccess;

namespace Backend_Rentify.Core.Extensions
{
    public static class CoreServiceExtension
    {
        public static void RegisterCoreServices(this IServiceCollection services)
        {
            services.AddSingleton<IMongoDbContext, MongoDbContext>();
            services.AddSingleton<IJWTHelper, JWTHelper>();
            services.AddSingleton<IAuthBusinessService, AuthBusinessService>();
        }
    }
}
