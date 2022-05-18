using MassTransit;
using reporting_microservice.Models;
using reporting_microservice.Services;

namespace reporting_microservice.Consumers
{
    public class ReviewConsumer:IConsumer<Review>
    {
        private readonly ReviewServices _reviewServices;

        private readonly ILogger<ReviewConsumer> _logger;

        public ReviewConsumer(ILogger<ReviewConsumer> logger, ReviewServices reviewServices)
        {
            _logger = logger;
            _reviewServices = reviewServices;
            _logger.LogInformation("Ad consumer created ");
        }
        public Task Consume(ConsumeContext<Review> context)
        {
            _reviewServices.InsertReview(context.Message);
            _logger.LogInformation("Ad created: {Text}", context.Message.Id);

            return Task.CompletedTask;
        }
    }
}
