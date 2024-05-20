using Backend_Rentify.Business.Models;
using Backend_Rentify.Business.Services.Auth;
using Backend_Rentify.Core.DataAccess;
using Backend_Rentify.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Backend_Rentify.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly ILogger<AuthController> _logger;
        private readonly IAuthBusinessService _authBusinessService;
        public AuthController(ILogger<AuthController> logger, IAuthBusinessService authBusinessService)
        {
            _logger = logger;
            _authBusinessService = authBusinessService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<BaseResponse> Register([FromBody] UserEntity user)
        {
            var response = new BaseResponse();
                response.IsSuccess = await _authBusinessService.Register(user);
            return response;
        }
    }
}