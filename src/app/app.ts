import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { Header } from './components/header/header';
import { GoldPriceCard } from './components/gold-price-card/gold-price-card';
import { GoldCalculator } from './components/gold-calculator/gold-calculator';
import { GoldPriceChart } from './components/gold-price-chart/gold-price-chart';
import { PriceHistory } from './components/price-history/price-history';
import { GoldService } from './services/gold.service';
import { GoldPrice, GoldHistory } from './models/gold.model';
import { formatFullDate } from './utils/gold-format';

// What the page knows about one request to the API
interface LoadState<T> {
  data: T[];
  loading: boolean;
  failed: boolean;
}

@Component({
  imports: [Header, GoldPriceCard, GoldCalculator, GoldPriceChart, PriceHistory],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private goldService = inject(GoldService);

  // Both lists are loaded from the backend API. `state` is a signal, so the template updates when data arrives.
  private pricesState = toSignal(this.load<GoldPrice>(this.goldService.getPrices()), {
    initialValue: { data: [], loading: true, failed: false },
  });
  private historyState = toSignal(this.load<GoldHistory>(this.goldService.getHistory()), {
    initialValue: { data: [], loading: true, failed: false },
  });

  get goldPrices(): GoldPrice[] {
    return this.pricesState().data;
  }

  get goldHistory(): GoldHistory[] {
    return this.historyState().data;
  }

  get isLoading(): boolean {
    return this.pricesState().loading || this.historyState().loading;
  }

  get hasError(): boolean {
    return this.pricesState().failed || this.historyState().failed;
  }

  // The date of the newest day in the history is shown as the "last update"
  get lastUpdate(): string {
    const last = this.goldHistory[this.goldHistory.length - 1];
    return last ? formatFullDate(last.date) : '—';
  }

  // The 24K price is highlighted in the hero
  get featured(): GoldPrice | undefined {
    return this.goldPrices.find((gold) => gold.karat === '24K');
  }

  // Change of one karat between the last two days of history (0 when there is not enough data)
  dailyChange(karat: string): number {
    const history = this.goldHistory;
    if (history.length < 2) return 0;
    const field = ('price' + karat.toLowerCase()) as keyof GoldHistory;
    const last = history[history.length - 1][field] as number;
    const previous = history[history.length - 2][field] as number;
    return last - previous;
  }

  absChange(karat: string): number {
    return Math.abs(this.dailyChange(karat));
  }

  private load<T>(source: Observable<T[]>) {
    return source.pipe(
      map((data): LoadState<T> => ({ data, loading: false, failed: false })),
      catchError(() => of<LoadState<T>>({ data: [], loading: false, failed: true })),
      startWith<LoadState<T>>({ data: [], loading: true, failed: false }),
    );
  }
}
