namespace Backend_Rentify.Business.Services.Mail
{
    public interface IMailService
    {
        Task Send(string toAddress, string subject, string body);
    }
}
