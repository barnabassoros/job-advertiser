using reporting_microservice.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace reporting_microservice.Services
{
    public class ReviewServices
    {
        private readonly IMongoCollection<Review> _reviews;
        public ReviewServices(IOptions<ReportingDatabaseSettings> reportsDatabaseSettings)
        {
            var mongoClient = new MongoClient(reportsDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(reportsDatabaseSettings.Value.DatabaseName);

            _reviews = mongoDatabase.GetCollection<Review>("Reviews");
        }
        public async void InsertReview(Review review) => _reviews.InsertOne(review);



        public List<double> GetYearlyReviews(string userId, int year)
        {
            List<double> reviews = new List<double>();
            for (int i = 1; i <= 12; i++)
            {
                var start = new DateTime(year, i, 1);
                var end = start.AddMonths(1);

                var review = _reviews.Aggregate()
                .Match(r => r.UserId == userId)
                .Lookup("Registrations", "RegistrationId", "_id", "Registration")
                .Lookup("Ads", "AdId", "_id", "Ad")
                .Match(a => ((DateTime)a["Time"] >= start && (DateTime)a["Time"] < end))
                .ToList().Average(r => (double)r["Stars"]);
                reviews.Add(review);
            }

            return reviews;
        }
    }
}
