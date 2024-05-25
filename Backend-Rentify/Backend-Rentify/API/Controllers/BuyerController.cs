
using Backend_Rentify.Business.Models.Seller;
using Backend_Rentify.Business.Services.Buyer;
using Microsoft.AspNetCore.Mvc;

namespace Backend_Rentify.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BuyerController : ControllerBase
    {

        private readonly IBuyerBusinessService _buyerBusinessService;
        public BuyerController(IBuyerBusinessService buyerBusinessService)
        {
            _buyerBusinessService = buyerBusinessService;
        }


        [HttpGet]
        [Route("properties")]
        public async Task<List<Property>> Properties([FromQuery] PaginationData paginationData)
        {
            var response = await _buyerBusinessService.GetProperties(paginationData.PageNumber, paginationData.PageSize);
            return response;
        }

        [HttpGet]
        [Route("search")]
        public async Task<List<Property>> Search([FromQuery] SearchQuery searchData)
        {
            var response = await _buyerBusinessService.SearchByQuery(searchData);
            return response;
        }
    }
}