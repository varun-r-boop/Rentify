namespace Backend_Rentify.Core.Models
{
    public partial class AppSettings
    {
        public string Secret { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
        public string SmtpHost { get; set; } = String.Empty;
        public string MailAddress { get; set; } = String.Empty;
        public string MailPassword { get; set; } = String.Empty;
        public string Port { get; set; } = String.Empty;
    }
}
