using Backend_Rentify.API.Helpers;
using System.Net;

namespace Backend_Rentify.API.Middleware
{
    public class JWTMiddleware
    {
        private readonly RequestDelegate _next;

        public JWTMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IJWTHelper jwtHelper)
        {

            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                var userData = jwtHelper.ValidateToken(token);

                if (userData != null)
                {
                    // Authentication successful, set user data in HttpContext
                    context.Items["User"] = userData;
                    await _next(context);
                    return;
                }
            }

            // Authentication failed, return 401 Unauthorized
            /*context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            await context.Response.WriteAsync("Unauthorized");*/
            await _next(context);


        }

    }
}
