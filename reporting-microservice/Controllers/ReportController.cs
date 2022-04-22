using Microsoft.AspNetCore.Mvc;
using reporting_microservice.Models;
using reporting_microservice.Services;

namespace reporting_microservice.Controllers;

[ApiController]
[Route("[controller]")]
public class ReportController : ControllerBase
{
    private readonly ReportServices _reportServices;

    public ReportController(ReportServices reportServices) => _reportServices = reportServices;

   [HttpGet]
   public async Task<List<Report>> GetReports() => await _reportServices.GetReports();
}
