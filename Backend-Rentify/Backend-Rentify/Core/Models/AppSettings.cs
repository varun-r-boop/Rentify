namespace Backend_Rentify.Core.Models
{
    public partial class AppSettings
    {
        public string Secret { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;

    }
}
