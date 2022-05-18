using reporting_microservice.Models;
using reporting_microservice.Services;
using reporting_microservice.Consumers;
using MassTransit;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ReportingDatabaseSettings>(builder.Configuration.GetSection("ReportsDatabase"));

builder.Services.AddSingleton<ReportServices>();
builder.Services.AddSingleton<AdServices>();
builder.Services.AddSingleton<RegistrationServices>();
builder.Services.AddSingleton<ReviewServices>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<AdConsumer>();
    x.AddConsumer<RegistrationConsumer>();
    x.AddConsumer<ReviewConsumer>();
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("rabbitmq", "/", h =>
         {
             h.Username("root");
             h.Password("pw");
         });
        cfg.ConfigureEndpoints(context);
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
