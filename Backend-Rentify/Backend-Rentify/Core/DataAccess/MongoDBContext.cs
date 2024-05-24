using Backend_Rentify.Core.Constants;
using Backend_Rentify.Core.Entities;
using Backend_Rentify.Core.Models;
using MongoDB.Driver;
using MongoDB.Driver.Core.Compression;
using MongoDB.Driver.Core.Configuration;

namespace Backend_Rentify.Core.DataAccess
{


    public class MongoDbContext : MongoDbContextBase, IMongoDbContext
    {
        public MongoDbContext(AppSettings appSettings)
            : base(appSettings) { }
    }

    public class MongoDbContextBase : IMongoDbContextBase
    {
        public IMongoDatabase MongoDatabase { get; }

        private readonly MongoClient _dbClient;

        public MongoDbContextBase(AppSettings appSettings)
        {
            if (string.IsNullOrEmpty(appSettings.ConnectionString))
                throw new ArgumentNullException(nameof(appSettings.ConnectionString));
            if (string.IsNullOrEmpty(appSettings.DatabaseName))
                throw new ArgumentNullException(nameof(appSettings.DatabaseName));

            MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(appSettings.ConnectionString));

            // set the max connection idle time to 60s
            settings.MaxConnectionIdleTime = TimeSpan.FromSeconds(60);

            settings.Compressors = new List<CompressorConfiguration>() {
               new CompressorConfiguration(CompressorType.ZStandard)
            };

            _dbClient = new MongoClient(settings);
            MongoDatabase = _dbClient.GetDatabase(appSettings.DatabaseName);

        }

        public IMongoClient DbClient => _dbClient;

        public IMongoCollection<UserEntity> Users => MongoDatabase.GetCollection<UserEntity>(MongoCollections.Users);
        public IMongoCollection<PropertyEntity> Property => MongoDatabase.GetCollection<PropertyEntity>(MongoCollections.Property);
    }
}
