
using Backend_Rentify.Business.Models.Seller;
using Backend_Rentify.Business.Services.Buyer;
using Backend_Rentify.Core.DataAccess;
using Backend_Rentify.Core.Entities;
using Backend_Rentify.Core.Models;
using MongoDB.Bson;
using MongoDB.Driver;
namespace Backend_Rentify.Business.Services.Seller
{
    public class BuyerBusinessService : IBuyerBusinessService
    {
        private readonly IMongoDbContext _mongoDbContext;
        private readonly AppSettings _appSettings;
        public BuyerBusinessService(IMongoDbContext mongoDbContext, AppSettings appSettings) 
        {
            _mongoDbContext = mongoDbContext;
            _appSettings = appSettings;
        }


        public async Task<List<Property>> GetProperties(int pageNumber, int pageSize)
        {
            var properties = new List<Property>();
            int skip = (pageNumber - 1) * pageSize;
            var propertiesEntity = await _mongoDbContext.Property
                .Find(FilterDefinition<PropertyEntity>.Empty)
                .Skip(skip)
                .Limit(pageSize)
                .ToListAsync();

            foreach (var property in propertiesEntity)
            {
                var p = new Property
                {
                    Id = property.Id,
                    Area = property.Area,
                    Info = property.Info,
                    Image = property.Image,
                    Place = property.Place,
                    Contact = property.Contact,
                    IntrestedUserIds = property.IntrestedUserIds
                };
                properties.Add(p);
            }

            return properties;
        }
        public async Task<List<Property>> SearchByQuery(SearchQuery searchQuery)
        {
            var properties = new List<Property>();
            var propertiesEntity = new List<PropertyEntity>();
            if (searchQuery.Area > 0)
            {
                double lowerBound = searchQuery.Area - 200;
                double upperBound = searchQuery.Area + 200;

                var areaFilter = Builders<PropertyEntity>.Filter.And(
                    Builders<PropertyEntity>.Filter.Gte(d => d.Area, lowerBound),
                    Builders<PropertyEntity>.Filter.Lte(d => d.Area, upperBound)
                );
                propertiesEntity =  await _mongoDbContext.Property.Find(areaFilter).ToListAsync();
                foreach (var property in propertiesEntity)
                {
                    var p = new Property();
                    p.Id = property.Id;
                    p.Area = property.Area;
                    p.Info = property.Info;
                    p.Image = property.Image;
                    p.Place = property.Place;
                    p.Contact = property.Contact;
                    p.IntrestedUserIds = property.IntrestedUserIds;
                    properties.Add(p);
                }
                return properties;
            }
            else
            {
                var locationFilter = Builders<PropertyEntity>.Filter.Regex("Place", new BsonRegularExpression(searchQuery.Location, "i"));
                propertiesEntity = await _mongoDbContext.Property.Find(locationFilter).ToListAsync();
                foreach (var property in propertiesEntity)
                {
                    var p = new Property();
                    p.Id = property.Id;
                    p.Area = property.Area;
                    p.Info = property.Info;
                    p.Image = property.Image;
                    p.Place = property.Place;
                    p.Contact = property.Contact;
                    p.IntrestedUserIds = property.IntrestedUserIds;
                    properties.Add(p);
                }
                return properties;
            }
        }
    }
}
