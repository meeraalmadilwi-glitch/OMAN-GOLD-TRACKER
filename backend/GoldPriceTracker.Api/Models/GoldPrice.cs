namespace GoldPriceTracker.Api.Models;

/// <summary>Today's price of one gram of gold for a single karat.</summary>
public class GoldPrice
{
    /// <summary>Karat purity, e.g. 24, 22, 21 or 18.</summary>
    public int Karat { get; init; }

    /// <summary>Price per gram.</summary>
    public decimal PricePerGram { get; init; }

    /// <summary>Currency code of the price.</summary>
    public string Currency { get; init; } = "OMR";
}
