using reporting_microservice.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace reporting_microservice.Services
{
    public class ReportServices
    {
        private readonly IMongoCollection<Report> _reports;

        public ReportServices(IOptions<ReportingDatabaseSettings> reportsDatabaseSettings)
        {
            var mongoClient = new MongoClient(@"mongodb://root:pw@localhost:3307/?authMechanism=DEFAULT");

            var mongoDatabase = mongoClient.GetDatabase(reportsDatabaseSettings.Value.DatabaseName);

            _reports = mongoDatabase.GetCollection<Report>(reportsDatabaseSettings.Value.ReportsCollectionName);
        }

        public async Task<List<Report>> GetReports() =>
            await _reports.Find(_ => true).ToListAsync();
    }
}
