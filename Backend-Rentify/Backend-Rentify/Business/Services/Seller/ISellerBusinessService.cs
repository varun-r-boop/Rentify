using Backend_Rentify.Business.Models.Seller;
using Backend_Rentify.Core.Entities;

namespace Backend_Rentify.Business.Services.Seller
{
    public interface ISellerBusinessService
    {
        Task<bool> UploadProperty(PropertyEntity property);
        Task<List<Property>> GetUserProperties(string userId);
        Task<Property> GetPropertyById(string propertyId);
        Task<bool> UpdateProperty(Property property);
        Task<bool> DeleteProperty(string propertyId);


    }
}
