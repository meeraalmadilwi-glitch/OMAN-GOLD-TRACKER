import { GoldHistory, GoldPrice } from '../models/gold.model';

// Demo Data: these values are for workshop purposes only, not real market prices.
// Today's gold prices per gram, in OMR.
export const GOLD_PRICES: GoldPrice[] = [
  { karat: '18K', price: 40.380 },
  { karat: '21K', price: 47.100 },
  { karat: '22K', price: 49.310 },
  { karat: '24K', price: 53.840 },
];

// Demo Data: 30 days of historical prices, oldest first, today last.
export const GOLD_HISTORY: GoldHistory[] = [
  { date: '2026-08-24', price18k: 39.735, price21k: 46.358, price22k: 48.565, price24k: 52.980 },
  { date: '2026-08-25', price18k: 39.638, price21k: 46.244, price22k: 48.446, price24k: 52.850 },
  { date: '2026-08-26', price18k: 39.158, price21k: 45.684, price22k: 47.859, price24k: 52.210 },
  { date: '2026-08-27', price18k: 39.360, price21k: 45.920, price22k: 48.107, price24k: 52.480 },
  { date: '2026-08-28', price18k: 39.720, price21k: 46.340, price22k: 48.547, price24k: 52.960 },
  { date: '2026-08-29', price18k: 39.983, price21k: 46.646, price22k: 48.868, price24k: 53.310 },
  { date: '2026-08-30', price18k: 40.260, price21k: 46.990, price22k: 49.207, price24k: 53.680 },
  { date: '2026-08-31', price18k: 40.515, price21k: 47.268, price22k: 49.518, price24k: 54.020 },
  { date: '2026-09-01', price18k: 40.808, price21k: 47.609, price22k: 49.876, price24k: 54.410 },
  { date: '2026-09-02', price18k: 41.085, price21k: 47.933, price22k: 50.215, price24k: 54.780 },
  { date: '2026-09-03', price18k: 41.340, price21k: 48.230, price22k: 50.527, price24k: 55.120 },
  { date: '2026-09-04', price18k: 41.580, price21k: 48.510, price22k: 50.820, price24k: 55.440 },
  { date: '2026-09-05', price18k: 41.445, price21k: 48.353, price22k: 50.655, price24k: 55.260 },
  { date: '2026-09-06', price18k: 41.235, price21k: 48.108, price22k: 50.398, price24k: 54.980 },
  { date: '2026-09-07', price18k: 40.988, price21k: 47.819, price22k: 50.096, price24k: 54.650 },
  { date: '2026-09-08', price18k: 40.740, price21k: 47.530, price22k: 49.793, price24k: 54.320 },
  { date: '2026-09-09', price18k: 40.508, price21k: 47.259, price22k: 49.509, price24k: 54.010 },
  { date: '2026-09-10', price18k: 40.335, price21k: 47.058, price22k: 49.298, price24k: 53.780 },
  { date: '2026-09-11', price18k: 40.155, price21k: 46.848, price22k: 49.078, price24k: 53.540 },
  { date: '2026-09-12', price18k: 39.983, price21k: 46.646, price22k: 48.868, price24k: 53.310 },
  { date: '2026-09-13', price18k: 39.810, price21k: 46.445, price22k: 48.657, price24k: 53.080 },
  { date: '2026-09-14', price18k: 39.705, price21k: 46.323, price22k: 48.528, price24k: 52.940 },
  { date: '2026-09-15', price18k: 39.863, price21k: 46.506, price22k: 48.721, price24k: 53.150 },
  { date: '2026-09-16', price18k: 40.065, price21k: 46.743, price22k: 48.968, price24k: 53.420 },
  { date: '2026-09-17', price18k: 40.260, price21k: 46.990, price22k: 49.207, price24k: 53.680 },
  { date: '2026-09-18', price18k: 40.433, price21k: 47.171, price22k: 49.418, price24k: 53.910 },
  { date: '2026-09-19', price18k: 40.613, price21k: 47.381, price22k: 49.638, price24k: 54.150 },
  { date: '2026-09-20', price18k: 40.485, price21k: 47.233, price22k: 49.482, price24k: 53.980 },
  { date: '2026-09-21', price18k: 40.320, price21k: 47.040, price22k: 49.240, price24k: 53.750 },
  { date: '2026-09-22', price18k: 40.380, price21k: 47.100, price22k: 49.310, price24k: 53.840 },
];
