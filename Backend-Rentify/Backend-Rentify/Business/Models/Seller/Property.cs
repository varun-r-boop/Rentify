using MongoDB.Bson.Serialization.Attributes;

namespace Backend_Rentify.Business.Models.Seller
{
    public class Property : BaseResponse
    {
        public string Id { get; set; }
        public string Place { get; set; }

        public int Area { get; set; }

        public string Info { get; set; }

        public string Image { get; set; }
        public ContactDetails Contact { get; set; }
        public List<string> IntrestedUserIds { get; set; }

    }

    public class SearchQuery
    {
        public string Location { get; set; } = string.Empty;
        public int Area{ get; set; } = 0;

    }

    public class PaginationData
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 6;

    }
}
