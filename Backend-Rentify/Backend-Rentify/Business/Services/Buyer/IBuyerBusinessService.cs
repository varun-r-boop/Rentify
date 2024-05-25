using Backend_Rentify.Business.Models.Seller;

namespace Backend_Rentify.Business.Services.Buyer
{
    public interface IBuyerBusinessService
    {
        Task<List<Property>> GetProperties(int pageNumber, int pageSize);
        Task<List<Property>> SearchByQuery(SearchQuery searchQuery);
    }
}
