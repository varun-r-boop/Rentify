using MongoDB.Bson.Serialization.Attributes;

namespace Backend_Rentify.Business.Models.Seller
{
    public class Property : BaseResponse
    {

        public string Place { get; set; }

        public int Area { get; set; }

        public string Info { get; set; }

        public string Image { get; set; }
    }
}
