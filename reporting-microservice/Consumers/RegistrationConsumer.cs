using MassTransit;
using reporting_microservice.Models;
using reporting_microservice.Services;


namespace reporting_microservice.Consumers
{
    public class RegistrationConsumer:IConsumer<Registration>
    {
        private readonly RegistrationServices _registrationServices;

        private readonly ILogger<RegistrationConsumer> _logger;

        public RegistrationConsumer(ILogger<RegistrationConsumer> logger, RegistrationServices registrationServices)
        {
            _logger = logger;
            _registrationServices = registrationServices;
            _logger.LogInformation("Registration consumer created ");
        }
        public Task Consume(ConsumeContext<Registration> context)
        {
            _registrationServices.InsertRegistration(context.Message);
            _logger.LogInformation("Registration created: {Text}", context.Message.Id);

            return Task.CompletedTask;
        }
    }
}
