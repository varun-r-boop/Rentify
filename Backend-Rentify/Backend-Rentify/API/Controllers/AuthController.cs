using Backend_Rentify.Business.Models;
using Backend_Rentify.Business.Models.Auth;
using Backend_Rentify.Business.Services.Auth;
using Backend_Rentify.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<BaseResponse> Register([FromBody] UserEntity user)
        {
            var response = new BaseResponse();
                response.IsSuccess = await _authBusinessService.Register(user);
            return response;
        }

        [HttpPost]
        [Route("login")]
        public async Task<BaseResponse> Login([FromBody] Login login)
        {
            var response = new BaseResponse();
            var token  = await _authBusinessService.Login(login);
            if(token != null)
            {
                HttpContext.Response.Headers.Add("Authorization", token);
                response.IsSuccess = true;
            }
            else
            {
                response.IsSuccess = false;
            }
            return response;
        }
    }
}