using GoldPriceTracker.Api.Models;

namespace GoldPriceTracker.Api.Services;

public interface IGoldPriceService
{
    /// <summary>All available prices, sorted from the highest karat to the lowest.</summary>
    IReadOnlyList<GoldPrice> GetAll();

    /// <summary>The price of one karat, or <c>null</c> when that karat is not available.</summary>
    GoldPrice? GetByKarat(int karat);

    /// <summary>Daily prices, oldest first.</summary>
    IReadOnlyList<GoldHistoryEntry> GetHistory();
}
