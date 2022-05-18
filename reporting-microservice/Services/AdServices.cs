using reporting_microservice.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Globalization;
using MongoDB.Bson;

namespace reporting_microservice.Services
{
    public class AdServices
    {
        private readonly IMongoCollection<Ad> _ads;
        public AdServices(IOptions<ReportingDatabaseSettings> reportsDatabaseSettings)
        {
            var mongoClient = new MongoClient(reportsDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(reportsDatabaseSettings.Value.DatabaseName);

            _ads = mongoDatabase.GetCollection<Ad>("Ads");
        }
        public async void InsertAd(Ad ad) => _ads.InsertOne(ad);

        public async Task<List<Ad>> GetAds(string userId, TimeFrame timeFrame)
        {
            return _ads.Find(ad => ad.UserId == userId &&
                            ad.Time >= timeFrame.StartTime &&
                            ad.Time <= timeFrame.EndTime).ToList();
        }

        public int GetAllPayment(string userId, TimeFrame timeFrame)
        {
            /*
            return _ads.Find(ad => ad.UserId == userId &&
                            ad.Time >= timeFrame.StartTime &&
                            ad.Time <= timeFrame.EndTime).ToList().Sum(a => a.Payment);
            */


            var start = new DateTime(2022, 1, 1);
            var end = new DateTime(2022, 12, 31);
            return _ads.Find(
                Builders<Ad>.Filter.Gte(ad => ad.Time, start) &
                Builders<Ad>.Filter.Lte(ad => ad.Time, end) &
                Builders<Ad>.Filter.Eq(ad => ad.UserId, userId))
                .ToList().Sum(a => a.Payment);


        }
        public List<int> GetYearlyPayments(string userId, int year)
        {
            List<int> payments = new List<int>();
            for (int i = 1; i <= 12; i++)
            {
                var start = new DateTime(year, i, 1);
                var end = start.AddMonths(1);
                int monthly = _ads.Find(
                    Builders<Ad>.Filter.Gte(ad => ad.Time, start) &
                    Builders<Ad>.Filter.Lt(ad => ad.Time, end) &
                    Builders<Ad>.Filter.Eq(ad => ad.UserId, userId)).ToList().Sum(a => a.Payment);
                payments.Add(monthly);
            }

            return payments;
        }

        public List<int> GetMonthlyPayments(string userId, int year, int month)
        {
            List<int> payments = new List<int>();
            var monthLength = System.DateTime.DaysInMonth(year, month);
            for (int i = 1; i <= monthLength; i++)
            {
                var start = new DateTime(year, month, i);
                var end = start.AddDays(1);
                int daily = _ads.Find(
                    Builders<Ad>.Filter.Gte(ad => ad.Time, start) &
                    Builders<Ad>.Filter.Lt(ad => ad.Time, end) &
                    Builders<Ad>.Filter.Eq(ad => ad.UserId, userId)).ToList().Sum(a => a.Payment);
                payments.Add(daily);
            }

            return payments;
        }
    }
}
