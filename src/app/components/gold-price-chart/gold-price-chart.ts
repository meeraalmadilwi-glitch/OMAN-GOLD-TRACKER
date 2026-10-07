import { Component, Input } from '@angular/core';
import { GoldHistory } from '../../models/gold.model';
import { formatShortDate, karatLabel } from '../../utils/gold-format';

@Component({
  selector: 'app-gold-price-chart',
  templateUrl: './gold-price-chart.html',
  styleUrl: './gold-price-chart.css',
  imports: [],
})
export class GoldPriceChart {
  @Input() history: GoldHistory[] = [];

  // The karat currently shown on the chart
  selectedKarat = '24K';
  karats = ['18K', '21K', '22K', '24K'];

  // Size of the drawing area used for the SVG line chart
  chartWidth = 600;
  chartHeight = 200;

  selectKarat(karat: string) {
    this.selectedKarat = karat;
  }

  // Reads the right price field from a history day, based on the selected karat
  private getKaratPrice(day: GoldHistory): number {
    if (this.selectedKarat === '18K') return day.price18k;
    if (this.selectedKarat === '21K') return day.price21k;
    if (this.selectedKarat === '22K') return day.price22k;
    return day.price24k;
  }

  get selectedPrices(): number[] {
    return this.history.map((day) => this.getKaratPrice(day));
  }

  get currentPrice(): number {
    const prices = this.selectedPrices;
    return prices[prices.length - 1] ?? 0;
  }

  get previousPrice(): number {
    const prices = this.selectedPrices;
    return prices[prices.length - 2] ?? 0;
  }

  get highestPrice(): number {
    return Math.max(...this.selectedPrices);
  }

  get lowestPrice(): number {
    return Math.min(...this.selectedPrices);
  }

  get priceChange(): number {
    return this.currentPrice - this.previousPrice;
  }

  get movementLabel(): string {
    if (this.priceChange > 0) return 'ارتفاع';
    if (this.priceChange < 0) return 'انخفاض';
    return 'لا تغيير';
  }

  get movementArrow(): string {
    if (this.priceChange > 0) return '↑';
    if (this.priceChange < 0) return '↓';
    return '→';
  }

  // Turns the 30 prices into "x,y" pairs that an SVG polyline can draw
  get chartPoints(): string {
    const prices = this.selectedPrices;
    const max = this.highestPrice;
    const min = this.lowestPrice;
    const range = max - min || 1;
    const stepX = this.chartWidth / (prices.length - 1);

    return prices
      .map((price, index) => {
        const x = index * stepX;
        const y = this.chartHeight - ((price - min) / range) * this.chartHeight;
        return `${x},${y}`;
      })
      .join(' ');
  }

  // One dot per day, used to show tooltips on hover
  get chartDots() {
    const prices = this.selectedPrices;
    const max = this.highestPrice;
    const min = this.lowestPrice;
    const range = max - min || 1;
    const stepX = this.chartWidth / (prices.length - 1);

    return this.history.map((day, index) => {
      const price = prices[index];
      return {
        x: index * stepX,
        y: this.chartHeight - ((price - min) / range) * this.chartHeight,
        date: this.formatDate(day.date),
        price,
      };
    });
  }

  get firstDate(): string {
    return this.history.length ? this.formatDate(this.history[0].date) : '';
  }

  get lastDate(): string {
    return this.history.length ? this.formatDate(this.history[this.history.length - 1].date) : '';
  }

  formatDate(dateString: string): string {
    return formatShortDate(dateString);
  }

  karatLabel(karat: string): string {
    return karatLabel(karat);
  }
}
