namespace reporting_microservice.Models
{
    public class Review
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string RegistrationId { get; set; }
        public int Stars { get; set; }
    }
}
