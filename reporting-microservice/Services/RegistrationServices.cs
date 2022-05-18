using reporting_microservice.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace reporting_microservice.Services
{
    public class RegistrationServices
    {
        private readonly IMongoCollection<Registration> _registrations;
        public RegistrationServices(IOptions<ReportingDatabaseSettings> reportsDatabaseSettings)
        {
            var mongoClient = new MongoClient(reportsDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(reportsDatabaseSettings.Value.DatabaseName);

            _registrations = mongoDatabase.GetCollection<Registration>("Registrations");
        }
        public async void InsertRegistration(Registration registration) => _registrations.InsertOne(registration);
    }
}
