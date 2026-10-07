import { Injectable } from '@angular/core';
import { GOLD_HISTORY, GOLD_PRICES } from '../data/gold-data';

// Today this service just returns local demo data.
// Later, these methods could call HttpClient to fetch a real REST API instead,
// without any component needing to change.
@Injectable({
  providedIn: 'root',
})
export class GoldService {
  getPrices() {
    return GOLD_PRICES;
  }

  getHistory() {
    return GOLD_HISTORY;
  }
}
