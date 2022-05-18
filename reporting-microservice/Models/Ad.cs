using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace reporting_microservice.Models
{
    public class Ad
    {
        public string Id { get; set; }
        public string UserId { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime Time { get; set; }
        public int Payment { get; set; }
    }
}
