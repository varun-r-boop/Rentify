
using Backend_Rentify.Business.Models.Seller;
using Backend_Rentify.Business.Services.Mail;
using Backend_Rentify.Core.DataAccess;
using Backend_Rentify.Core.Entities;
using Backend_Rentify.Core.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;


namespace Backend_Rentify.Business.Services.Seller
{
    public class SellerBusinessService : ISellerBusinessService
    {
        private readonly IMongoDbContext _mongoDbContext;
        private readonly AppSettings _appSettings;
        private readonly IMailService _mailService;
        public SellerBusinessService(IMongoDbContext mongoDbContext, AppSettings appSettings, IMailService mailService) 
        {
            _mongoDbContext = mongoDbContext;
            _appSettings = appSettings;
            _mailService = mailService;
        }

        public async Task<bool> UploadProperty(PropertyEntity property)
        {
            if(property != null)
            {
                property.Id = Guid.NewGuid().ToString();
                await _mongoDbContext.Property.InsertOneAsync(property);
                return true;
            }
            return false;

        }

        public async Task<List<Property>> GetUserProperties(string userId)
        {
            var properties = new List<Property>();
            var propertiesEntity= await _mongoDbContext.Property.AsQueryable().Where(x => x.UserId == userId).ToListAsync();
            foreach(var property in propertiesEntity)
            {
                var p = new Property();
                p.Id = property.Id;
                p.Area = property.Area;
                p.Info= property.Info;
                p.Image= property.Image;
                p.Place= property.Place;
                p.Contact = property.Contact;
                p.IntrestedUserIds= property.IntrestedUserIds;
                properties.Add(p);
            }
            return properties;
        }

        public async Task<Property> GetPropertyById(string propertyId)
        {
            var propertyEntity = await _mongoDbContext.Property.AsQueryable().Where(x => x.Id == propertyId).FirstOrDefaultAsync();

                var property = new Property();
                property.Id = propertyEntity.Id;
                property.Area = propertyEntity.Area;
                property.Info = propertyEntity.Info;
                property.Image = propertyEntity.Image;
                property.Place = propertyEntity.Place;
                property.Contact = propertyEntity.Contact;
                property.IntrestedUserIds= propertyEntity.IntrestedUserIds;
            return property;
        }

        public async Task<bool> UpdateProperty(Property property)
        {
            var intrestedUserIds = await GetIntrestedUserIds(property.Id);
            if(property.IntrestedUserIds != null &&  property.IntrestedUserIds.Count > 0)
            {
                await SendMail(property, property.IntrestedUserIds[property.IntrestedUserIds.Count - 1]);
                intrestedUserIds.AddRange(property.IntrestedUserIds.Except(intrestedUserIds));

            }
            var filter = Builders<PropertyEntity>.Filter.Eq(p => p.Id, property.Id);
            var update = Builders<PropertyEntity>.Update
                .Set(p => p.Area, property.Area)
                .Set(p => p.Place, property.Place)
                .Set(p => p.Image, property.Image)
                .Set(p => p.Info, property.Info)
                .Set(p => p.Contact, property.Contact)
                .Set(p => p.IntrestedUserIds, intrestedUserIds);
            var updateResult = await _mongoDbContext.Property.UpdateOneAsync(filter, update);
            return true;
        }

        public async Task<bool> DeleteProperty(string propertyId)
        {
            var filter = Builders<PropertyEntity>.Filter.Eq(p => p.Id, propertyId);
            _ =  await _mongoDbContext.Property.DeleteOneAsync(filter);
            return true;
        }

        private async Task<List<string>> GetIntrestedUserIds(string propertyId)
        {
            return await _mongoDbContext.Property.AsQueryable().Where(p => p.Id == propertyId).Select(p => p.IntrestedUserIds).FirstOrDefaultAsync();
        }

        private async Task<UserEntity> GetUserDetails(string userId)
        {
            return await _mongoDbContext.Users.AsQueryable().Where(p => p.Id == userId).FirstOrDefaultAsync();
        }

        private async Task<UserEntity> GetOwnerDetails(string propertyId)
        {
            var userId = await _mongoDbContext.Property.AsQueryable().Where(p => p.Id == propertyId).Select(p => p.UserId).FirstOrDefaultAsync();
            return await GetUserDetails(userId);
        }
        private async Task<bool> SendMail(Property property , string userId)
        {
            var user = await GetUserDetails(userId);
            var owner = await GetOwnerDetails(property.Id);
            string buyerTemplate = $@"
                                    <html>
                                    <body>
                                        <h2>Rentify</h2>
                                        <p><b>Property Owner:</b> {owner.FirstName}</p>
                                        <p><b>Location:</b> {property.Place}</p>
                                        <p><b>Area:</b> {property.Area}</p>
                                        <p><b>Info:</b> {property.Info}</p>
                                        <p><b>Mobile:</b> {property.Contact.Mobile}</p>
                                        <p><b>Email:</b> {property.Contact.Email}</p>
                                    </body>
                                    </html>";
            string ownerTemplate = $@"
                                    <html>
                                    <body>
                                        <h2>Rentify</h2>
                                        <p><b>Intrested buyer:</b> {user.FirstName}</p>
                                        <p><b>Mobile:</b> {user.Mobile}</p>
                                        <p><b>Email:</b> {user.Email}</p>
                                    </body>
                                    </html>";
            await _mailService.Send(user.Email, "Rentify", buyerTemplate);
            await _mailService.Send(owner.Email, "Rentify", ownerTemplate);
            return true;
        }

    }
}
