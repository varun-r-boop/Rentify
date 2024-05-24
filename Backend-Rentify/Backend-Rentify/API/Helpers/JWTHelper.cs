using Backend_Rentify.Business.Enums;
using Backend_Rentify.Business.Models;
using Backend_Rentify.Business.Models.Auth;
using Backend_Rentify.Core.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend_Rentify.API.Helpers
{
    public interface IJWTHelper
    {
        public string GenerateToken(User user);
        public JWTData? ValidateToken(string token);
    }

    public class JWTHelper : IJWTHelper
    {
        private readonly AppSettings _appSettings;
        private readonly IConfiguration _config;

        public JWTHelper(AppSettings appSettings, IConfiguration config)
        {
            _appSettings = appSettings;
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.UserType.ToString()),
                    new Claim(ClaimTypes.Name, user.FirstName),
                    new Claim("id", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public JWTData? ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var jwtData = new JWTData
                {
                    Id = new Guid(jwtToken.Claims.First(claim => claim.Type == "id").Value).ToString(),
                    UserType = (UserType)Enum.Parse(typeof(UserType), jwtToken.Claims.First(claim => claim.Type == ClaimTypes.Role).Value)
                };

                return jwtData;
            }
            catch
            {
                return null;
            }
        }

    }
}
