namespace GoldPriceTracker.Api.Models;

/// <summary>Prices per gram of all karats on one day.</summary>
public class GoldHistoryEntry
{
    public DateOnly Date { get; init; }

    public decimal Price18K { get; init; }

    public decimal Price21K { get; init; }

    public decimal Price22K { get; init; }

    public decimal Price24K { get; init; }
}
