using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace reporting_microservice.Models;

public class Report
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = null!;
}