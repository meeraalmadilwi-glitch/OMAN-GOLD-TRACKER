using GoldPriceTracker.Api.Models;
using GoldPriceTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GoldPriceTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class PricesController : ControllerBase
{
    private readonly IGoldPriceService _prices;

    public PricesController(IGoldPriceService prices) => _prices = prices;

    /// <summary>Gets the gold prices of all karats, or of one karat with <c>?karat=21</c>.</summary>
    /// <param name="karat">Optional karat filter: 24, 22, 21 or 18.</param>
    [HttpGet]
    [ProducesResponseType<IReadOnlyList<GoldPrice>>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public ActionResult<IReadOnlyList<GoldPrice>> GetPrices([FromQuery] int? karat)
    {
        if (karat is null)
        {
            return Ok(_prices.GetAll());
        }

        var price = _prices.GetByKarat(karat.Value);
        return price is null ? KaratNotFound(karat.Value) : Ok(new[] { price });
    }

    /// <summary>Gets the price of a specific karat.</summary>
    /// <param name="karat">24, 22, 21 or 18.</param>
    [HttpGet("{karat:int}")]
    [ProducesResponseType<GoldPrice>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public ActionResult<GoldPrice> GetPriceByKarat(int karat)
    {
        var price = _prices.GetByKarat(karat);
        return price is null ? KaratNotFound(karat) : Ok(price);
    }

    /// <summary>Gets the daily price history (oldest first).</summary>
    [HttpGet("history")]
    [ProducesResponseType<IReadOnlyList<GoldHistoryEntry>>(StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<GoldHistoryEntry>> GetHistory() => Ok(_prices.GetHistory());

    private NotFoundObjectResult KaratNotFound(int karat) => NotFound(new ProblemDetails
    {
        Status = StatusCodes.Status404NotFound,
        Title = "Karat not found",
        Detail = $"No price is available for karat {karat}. Available karats: 24, 22, 21, 18.",
    });
}
