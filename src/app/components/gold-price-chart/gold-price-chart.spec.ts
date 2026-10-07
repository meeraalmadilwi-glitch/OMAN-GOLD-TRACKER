import { TestBed } from '@angular/core/testing';
import { GoldPriceChart } from './gold-price-chart';

describe('GoldPriceChart', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldPriceChart],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GoldPriceChart);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should calculate current, highest, and lowest prices for the selected karat', () => {
    const fixture = TestBed.createComponent(GoldPriceChart);
    const component = fixture.componentInstance;
    component.history = [
      { date: '2026-09-20', price18k: 40, price21k: 47, price22k: 49, price24k: 53 },
      { date: '2026-09-21', price18k: 41, price21k: 48, price22k: 50, price24k: 55 },
      { date: '2026-09-22', price18k: 40.5, price21k: 47.5, price22k: 49.5, price24k: 54 },
    ];
    component.selectedKarat = '24K';

    expect(component.currentPrice).toBe(54);
    expect(component.previousPrice).toBe(55);
    expect(component.highestPrice).toBe(55);
    expect(component.lowestPrice).toBe(53);
  });

  it('should place the oldest date label on the same side as the first point of the line', () => {
    const fixture = TestBed.createComponent(GoldPriceChart);
    const component = fixture.componentInstance;
    component.history = [
      { date: '2026-09-20', price18k: 40, price21k: 47, price22k: 49, price24k: 53 },
      { date: '2026-09-22', price18k: 40.5, price21k: 47.5, price22k: 49.5, price24k: 54 },
    ];
    fixture.detectChanges();

    // The SVG is always drawn left-to-right, so the label row must be LTR as well,
    // otherwise an RTL page would show the newest date under the oldest point.
    const labelRow = (fixture.nativeElement as HTMLElement).querySelector('div[dir="ltr"]');
    const labels = Array.from(labelRow?.querySelectorAll('span') ?? []).map((el) => el.textContent?.trim());

    expect(labelRow).toBeTruthy();
    expect(labels[0]).toBe(component.firstDate);
    expect(labels[labels.length - 1]).toBe(component.lastDate);
  });
});
