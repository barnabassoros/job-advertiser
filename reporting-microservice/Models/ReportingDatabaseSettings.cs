namespace reporting_microservice.Models
{
    public class ReportingDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string ReportsCollectionName { get; set; } = null!;
    }
}
