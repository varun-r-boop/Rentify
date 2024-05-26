using MimeKit;
using System.Net.Mail;
using MailKit.Net.Smtp;
using Backend_Rentify.Core.Models;

namespace Backend_Rentify.Business.Services.Mail
{
    public class MailService : IMailService
    {
        private readonly AppSettings _appSettings;
        public MailService(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }
        public async Task Send(string toAddress, string subject, string body)
        {

            string? SmtpServer = _appSettings.SmtpHost;
            int Port = int.Parse(_appSettings.Port);

            string? FromAddress = _appSettings.MailAddress;
            string? Password = _appSettings.MailPassword;
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(FromAddress));
            email.To.Add(MailboxAddress.Parse(toAddress));

            email.Subject = subject;

            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = body };

            using (var smtp = new MailKit.Net.Smtp.SmtpClient())
            {
                smtp.Connect(SmtpServer, Port);

                smtp.Authenticate(
                    FromAddress,
                    Password
                );

                await smtp.SendAsync(email);

                smtp.Disconnect(true);
            }
        }
    }
}
