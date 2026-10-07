import { Component, Input } from '@angular/core';
import { karatLabel } from '../../utils/gold-format';

@Component({
  selector: 'app-gold-price-card',
  templateUrl: './gold-price-card.html',
  styleUrl: './gold-price-card.css',
  imports: [],
})
export class GoldPriceCard {
  // Data comes in from the parent component through these inputs
  @Input() karat = '';
  @Input() price = 0;
  @Input() currency = 'ر.ع';
  @Input() unit = 'لكل جرام صافي';

  get karatLabel(): string {
    return karatLabel(this.karat);
  }

  // Purity of the karat, e.g. 18K -> 75%, 24K -> 99.9%
  get purity(): string {
    const value = parseInt(this.karat, 10);
    if (!value) return '';
    return value === 24 ? '99.9%' : ((value / 24) * 100).toFixed(1).replace('.0', '') + '%';
  }
}
