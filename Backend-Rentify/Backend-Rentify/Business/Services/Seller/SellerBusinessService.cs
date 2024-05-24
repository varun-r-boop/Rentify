using Amazon.Runtime.Internal;
using Backend_Rentify.API.Helpers;
using Backend_Rentify.Business.Models.Auth;
using Backend_Rentify.Business.Models.Seller;
using Backend_Rentify.Core.DataAccess;
using Backend_Rentify.Core.Entities;
using Backend_Rentify.Core.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using MongoDB.Driver.Linq;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Reflection;
using static System.Net.Mime.MediaTypeNames;

namespace Backend_Rentify.Business.Services.Seller
{
    public class SellerBusinessService : ISellerBusinessService
    {
        private readonly IMongoDbContext _mongoDbContext;
        private readonly AppSettings _appSettings;
        private readonly GridFSBucket _gridFS;
        public SellerBusinessService(IMongoDbContext mongoDbContext, AppSettings appSettings) 
        {
            _mongoDbContext = mongoDbContext;
            _appSettings = appSettings;
            _gridFS = new GridFSBucket(_mongoDbContext.DbClient.GetDatabase(_appSettings.DatabaseName));
        }

        public async Task<bool> UploadProperty(PropertyEntity property)
        {
            if(property != null)
            {
/*                if(image != null)
                {
                // Save image to GridFS
                var imageId = ObjectId.GenerateNewId();
                using (var stream = new MemoryStream())
                {
                    await image.CopyToAsync(stream);
                    stream.Seek(0, SeekOrigin.Begin);
                    await _gridFS.UploadFromStreamAsync(imageId.ToString(), stream);
                }*/
                property.Id = Guid.NewGuid().ToString();
/*                property.ImageId = imageId.ToString();
                }*/

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
                p.Area = property.Area;
                p.Info= property.Info;
                p.Image= property.Image;
                p.Place= property.Place;
                properties.Add(p);
            }
            return properties;
        }

    }
}
