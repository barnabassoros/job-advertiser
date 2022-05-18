using Microsoft.AspNetCore.Mvc;
using reporting_microservice.Models;
using reporting_microservice.Services;

namespace reporting_microservice.Controllers;

[ApiController]
[Route("[controller]")]
public class ReportController : ControllerBase
{
    private readonly ReportServices _reportServices;
    private readonly AdServices _adServices;
    private readonly ReviewServices _reviewServices;
    public class MonthlyPaymentData
    {
        public string month { get; set; }
        public int payment { get; set; }

        public MonthlyPaymentData(string m, int p)
        {
            month = m;
            payment = p;
        }
    }
    public class MonthlyReviewData
    {
        public string month { get; set; }
        public double review { get; set; }

        public MonthlyReviewData(string m, double r)
        {
            month = m;
            review = r;
        }
    }
    public class DailyPaymentData
    {
        public int day { get; set; }
        public int payment { get; set; }
        public DailyPaymentData(int d, int p)
        {
            day = d;
            payment = p;
        }
    }
    public class DailyReviewData
    {
        public int day { get; set; }
        public double review { get; set; }
        public DailyReviewData(int d, double r)
        {
            day = d;
            review = r;
        }
    }

    public List<DailyPaymentData> createMonthlyList(List<int> payments)
    {
        List<DailyPaymentData> list = new List<DailyPaymentData>();

        for (int i = 0; i < payments.Count; i++)
        {
            list.Add(new DailyPaymentData(i + 1, payments[i]));
        }
        return list;
    }

    public List<MonthlyPaymentData> createYearlyPaymentList(List<int> payments)
    {
        List<MonthlyPaymentData> list = new List<MonthlyPaymentData>();

        list.Add(new MonthlyPaymentData("January", payments[0]));
        list.Add(new MonthlyPaymentData("February", payments[1]));
        list.Add(new MonthlyPaymentData("March", payments[2]));
        list.Add(new MonthlyPaymentData("April", payments[3]));
        list.Add(new MonthlyPaymentData("May", payments[4]));
        list.Add(new MonthlyPaymentData("June", payments[5]));
        list.Add(new MonthlyPaymentData("July", payments[6]));
        list.Add(new MonthlyPaymentData("August", payments[7]));
        list.Add(new MonthlyPaymentData("September", payments[8]));
        list.Add(new MonthlyPaymentData("October", payments[9]));
        list.Add(new MonthlyPaymentData("November", payments[10]));
        list.Add(new MonthlyPaymentData("December", payments[11]));

        return list;
    }

    public List<MonthlyReviewData> createYearlyReviewList(List<double> reviews)
    {
        List<MonthlyReviewData> list = new List<MonthlyReviewData>();

        list.Add(new MonthlyReviewData("January", reviews[0]));
        list.Add(new MonthlyReviewData("February", reviews[1]));
        list.Add(new MonthlyReviewData("March", reviews[2]));
        list.Add(new MonthlyReviewData("April", reviews[3]));
        list.Add(new MonthlyReviewData("May", reviews[4]));
        list.Add(new MonthlyReviewData("June", reviews[5]));
        list.Add(new MonthlyReviewData("July", reviews[6]));
        list.Add(new MonthlyReviewData("August", reviews[7]));
        list.Add(new MonthlyReviewData("September", reviews[8]));
        list.Add(new MonthlyReviewData("October", reviews[9]));
        list.Add(new MonthlyReviewData("November", reviews[10]));
        list.Add(new MonthlyReviewData("December", reviews[11]));

        return list;
    }

    public ReportController(ReportServices reportServices, AdServices adServices, ReviewServices reviewServices)
    {
        _reportServices = reportServices;
        _adServices = adServices;
        _reviewServices = reviewServices;
    }

    [HttpGet]
    [Route("jobs/payment/{year}")]
    [Produces("application/json")]
    public List<MonthlyPaymentData> GetYearlyPayments(int year, [FromHeader(Name = "X-User-Id")] string userId)
    {
        var payments = _adServices.GetYearlyPayments(userId, year);
        return createYearlyPaymentList(payments);
    }

    [HttpGet]
    [Route("jobs/payment/{year}/{month}")]
    [Produces("application/json")]
    public List<DailyPaymentData> GetMonthlyPayments(int year, int month, [FromHeader(Name = "X-User-Id")] string userId)
    {
        var payments = _adServices.GetMonthlyPayments(userId, year, month);
        return createMonthlyList(payments);
    }

    [HttpGet]
    [Route("reviews/{year}")]
    [Produces("application/json")]
    public List<MonthlyReviewData> GetYearlyReviews(int year, [FromHeader(Name = "X-User-Id")] string userId)
    {
        var payments = _reviewServices.GetYearlyReviews(userId, year);
        return createYearlyReviewList(payments);
    }

}

