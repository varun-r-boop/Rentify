using Backend_Rentify.Business.Enums;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend_Rentify.Core.Entities
{
        [BsonIgnoreExtraElements]
        public class PropertyEntity
        {
            [BsonId]
            public string Id { get; set; }

            [BsonElement("userId")]
            public string UserId { get; set; }

            [BsonElement("place")]
            public string Place { get; set; }

            [BsonElement("Area")]
            public int Area { get; set; }

            [BsonElement("info")]
            public string Info { get; set; }

            [BsonElement("image")]
            public string Image { get; set; }


        }
}
