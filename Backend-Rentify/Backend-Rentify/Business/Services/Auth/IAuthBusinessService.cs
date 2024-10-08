﻿using Backend_Rentify.Business.Models.Auth;
using Backend_Rentify.Core.Entities;

namespace Backend_Rentify.Business.Services.Auth
{
    public interface IAuthBusinessService
    {
        Task<bool> Register(UserEntity user);
        Task<string> Login(Login login);
    }
}
