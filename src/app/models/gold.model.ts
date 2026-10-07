// A single karat's price for today, e.g. { karat: '24K', price: 53.840 }
export interface GoldPrice {
  karat: string;
  price: number;
}

// One day of historical prices for all four karats
export interface GoldHistory {
  date: string;
  price18k: number;
  price21k: number;
  price22k: number;
  price24k: number;
}
