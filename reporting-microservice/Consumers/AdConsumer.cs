using MassTransit;
using reporting_microservice.Models;
using reporting_microservice.Services;

namespace reporting_microservice.Consumers
{
    public class AdConsumer:IConsumer<Ad>
    {

        private readonly AdServices _adServices;

        private readonly ILogger<AdConsumer> _logger;

        public AdConsumer(ILogger<AdConsumer> logger, AdServices adServices)
        {
            _logger = logger;
            _adServices = adServices;
            _logger.LogInformation("Ad consumer created ");
        }
        public Task Consume(ConsumeContext<Ad> context)
        {
            _adServices.InsertAd(context.Message);
            _logger.LogInformation("Ad created: {Text}", context.Message.Id);

            return Task.CompletedTask;
        }
    }
}
