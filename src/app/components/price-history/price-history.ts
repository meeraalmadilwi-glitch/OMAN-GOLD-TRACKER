import { Component, Input } from '@angular/core';
import { GoldHistory } from '../../models/gold.model';
import { formatShortDate } from '../../utils/gold-format';

@Component({
  selector: 'app-price-history',
  templateUrl: './price-history.html',
  styleUrl: './price-history.css',
  imports: [],
})
export class PriceHistory {
  @Input() history: GoldHistory[] = [];

  // Shows the most recent day first
  get reversedHistory(): GoldHistory[] {
    return [...this.history].reverse();
  }

  formatDate(dateString: string): string {
    return formatShortDate(dateString);
  }
}
