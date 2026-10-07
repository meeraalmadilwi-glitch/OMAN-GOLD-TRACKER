import { Component, inject } from '@angular/core';
import { Header } from './components/header/header';
import { GoldPriceCard } from './components/gold-price-card/gold-price-card';
import { GoldCalculator } from './components/gold-calculator/gold-calculator';
import { GoldPriceChart } from './components/gold-price-chart/gold-price-chart';
import { PriceHistory } from './components/price-history/price-history';
import { GoldService } from './services/gold.service';
import { GoldPrice, GoldHistory } from './models/gold.model';
import { formatFullDate } from './utils/gold-format';

@Component({
  imports: [Header, GoldPriceCard, GoldCalculator, GoldPriceChart, PriceHistory],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private goldService = inject(GoldService);

  goldPrices: GoldPrice[] = this.goldService.getPrices();
  goldHistory: GoldHistory[] = this.goldService.getHistory();

  // The date of the newest day in the history is shown as the "last update"
  get lastUpdate(): string {
    const last = this.goldHistory[this.goldHistory.length - 1];
    return last ? formatFullDate(last.date) : '—';
  }
}
