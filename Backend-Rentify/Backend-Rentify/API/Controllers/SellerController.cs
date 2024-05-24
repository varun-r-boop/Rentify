using Backend_Rentify.Business.Models;
using Backend_Rentify.Business.Models.Auth;
using Backend_Rentify.Business.Models.Seller;
using Backend_Rentify.Business.Services.Auth;
using Backend_Rentify.Business.Services.Seller;
using Backend_Rentify.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend_Rentify.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SellerController : ControllerBase
    {

        private readonly ISellerBusinessService _sellerBusinessService;
        public SellerController(ISellerBusinessService sellerBusinessService)
        {
            _sellerBusinessService = sellerBusinessService;
        }

        [HttpPost]
        [Route("upload")]
        public async Task<BaseResponse> Register([FromBody] PropertyEntity property)
        {
            var response = new BaseResponse();
            response.IsSuccess = await _sellerBusinessService.UploadProperty(property);
            return response;
        }

        [HttpGet]
        [Route("properties")]
        public async Task<List<Property>> UserProperties([FromQuery]string userId)
        {
            var response = await _sellerBusinessService.GetUserProperties(userId);
            return response;
        }
    }
}