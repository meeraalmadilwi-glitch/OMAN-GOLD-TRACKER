import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoldPrice } from '../../models/gold.model';
import { karatLabel } from '../../utils/gold-format';

@Component({
  selector: 'app-gold-calculator',
  templateUrl: './gold-calculator.html',
  styleUrl: './gold-calculator.css',
  imports: [FormsModule],
})
export class GoldCalculator {
  @Input() goldPrices: GoldPrice[] = [];

  // The karat currently selected by the user
  selectedKarat = '21K';
  // null when the input is empty (that is what a number input gives Angular)
  grams: number | null = 10;
  totalValue = 0;
  hasCalculated = false;

  // The result card shows the values that were used when the button was pressed,
  // so editing the inputs afterwards cannot make the card contradict itself.
  resultKarat = '';
  resultGrams = 0;
  resultPrice = 0;

  // A weight is valid only if it is a real number greater than zero
  get isValidWeight(): boolean {
    return typeof this.grams === 'number' && Number.isFinite(this.grams) && this.grams > 0;
  }

  calculateGoldValue() {
    if (!this.isValidWeight) {
      return;
    }

    const gold = this.goldPrices.find((item) => item.karat === this.selectedKarat);

    if (gold) {
      const grams = this.grams as number;
      this.totalValue = gold.price * grams;
      this.resultKarat = gold.karat;
      this.resultGrams = grams;
      this.resultPrice = gold.price;
      this.hasCalculated = true;
    }
  }

  karatLabel(karat: string): string {
    return karatLabel(karat);
  }
}
