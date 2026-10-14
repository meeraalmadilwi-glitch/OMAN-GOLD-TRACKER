using GoldPriceTracker.Api.Models;

namespace GoldPriceTracker.Api.Services;

/// <summary>
/// Keeps demo prices in memory (no database). These are NOT real market prices.
/// </summary>
public class InMemoryGoldPriceService : IGoldPriceService
{
    private const string DemoCurrency = "OMR";

    private static readonly IReadOnlyList<GoldPrice> Prices =
    [
        new() { Karat = 24, PricePerGram = 53.840m, Currency = DemoCurrency },
        new() { Karat = 22, PricePerGram = 49.310m, Currency = DemoCurrency },
        new() { Karat = 21, PricePerGram = 47.100m, Currency = DemoCurrency },
        new() { Karat = 18, PricePerGram = 40.380m, Currency = DemoCurrency },
    ];

    private static readonly IReadOnlyList<GoldHistoryEntry> History =
    [
        Day("2026-08-24", 39.735m, 46.358m, 48.565m, 52.980m),
        Day("2026-08-25", 39.638m, 46.244m, 48.446m, 52.850m),
        Day("2026-08-26", 39.158m, 45.684m, 47.859m, 52.210m),
        Day("2026-08-27", 39.360m, 45.920m, 48.107m, 52.480m),
        Day("2026-08-28", 39.720m, 46.340m, 48.547m, 52.960m),
        Day("2026-08-29", 39.983m, 46.646m, 48.868m, 53.310m),
        Day("2026-08-30", 40.260m, 46.990m, 49.207m, 53.680m),
        Day("2026-08-31", 40.515m, 47.268m, 49.518m, 54.020m),
        Day("2026-09-01", 40.808m, 47.609m, 49.876m, 54.410m),
        Day("2026-09-02", 41.085m, 47.933m, 50.215m, 54.780m),
        Day("2026-09-03", 41.340m, 48.230m, 50.527m, 55.120m),
        Day("2026-09-04", 41.580m, 48.510m, 50.820m, 55.440m),
        Day("2026-09-05", 41.445m, 48.353m, 50.655m, 55.260m),
        Day("2026-09-06", 41.235m, 48.108m, 50.398m, 54.980m),
        Day("2026-09-07", 40.988m, 47.819m, 50.096m, 54.650m),
        Day("2026-09-08", 40.740m, 47.530m, 49.793m, 54.320m),
        Day("2026-09-09", 40.508m, 47.259m, 49.509m, 54.010m),
        Day("2026-09-10", 40.335m, 47.058m, 49.298m, 53.780m),
        Day("2026-09-11", 40.155m, 46.848m, 49.078m, 53.540m),
        Day("2026-09-12", 39.983m, 46.646m, 48.868m, 53.310m),
        Day("2026-09-13", 39.810m, 46.445m, 48.657m, 53.080m),
        Day("2026-09-14", 39.705m, 46.323m, 48.528m, 52.940m),
        Day("2026-09-15", 39.863m, 46.506m, 48.721m, 53.150m),
        Day("2026-09-16", 40.065m, 46.743m, 48.968m, 53.420m),
        Day("2026-09-17", 40.260m, 46.990m, 49.207m, 53.680m),
        Day("2026-09-18", 40.433m, 47.171m, 49.418m, 53.910m),
        Day("2026-09-19", 40.613m, 47.381m, 49.638m, 54.150m),
        Day("2026-09-20", 40.485m, 47.233m, 49.482m, 53.980m),
        Day("2026-09-21", 40.320m, 47.040m, 49.240m, 53.750m),
        Day("2026-09-22", 40.380m, 47.100m, 49.310m, 53.840m),
    ];

    public IReadOnlyList<GoldPrice> GetAll() => Prices;

    public GoldPrice? GetByKarat(int karat) => Prices.FirstOrDefault(p => p.Karat == karat);

    public IReadOnlyList<GoldHistoryEntry> GetHistory() => History;

    private static GoldHistoryEntry Day(string date, decimal k18, decimal k21, decimal k22, decimal k24) => new()
    {
        Date = DateOnly.Parse(date),
        Price18K = k18,
        Price21K = k21,
        Price22K = k22,
        Price24K = k24,
    };
}
