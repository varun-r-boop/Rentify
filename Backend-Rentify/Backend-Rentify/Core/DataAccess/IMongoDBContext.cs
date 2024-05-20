using Backend_Rentify.Core.Entities;
using MongoDB.Driver;

namespace Backend_Rentify.Core.DataAccess
{
    #region Using Directives

    #endregion

    public interface IMongoDbContext : IMongoDbContextBase { }
    public interface IMongoDbContextBase
    {
        IMongoClient DbClient { get; }
        IMongoDatabase MongoDatabase { get; }
        IMongoCollection<UserEntity> Users { get; }

    }
}

