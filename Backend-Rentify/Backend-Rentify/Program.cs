using Backend_Rentify.API.Middleware;
using Backend_Rentify.Core.DataAccess;
using Backend_Rentify.Core.Extensions;
using Backend_Rentify.Core.Models;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Register the MongoDB context
builder.Services.AddSingleton<AppSettings>(builder.Configuration.GetSection("AppSettings").Get<AppSettings>());
builder.Services.RegisterCoreServices();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    .WithExposedHeaders("Authorization")
    .WithOrigins("https://localhost:4200 ", "http://localhost:4200"));
app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseMiddleware<JWTMiddleware>();

app.MapControllers();

app.Run();
