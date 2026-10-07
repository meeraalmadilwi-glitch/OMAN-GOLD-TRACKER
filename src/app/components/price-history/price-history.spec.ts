import { TestBed } from '@angular/core/testing';
import { PriceHistory } from './price-history';

describe('PriceHistory', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceHistory],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PriceHistory);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the most recent day first', () => {
    const fixture = TestBed.createComponent(PriceHistory);
    const component = fixture.componentInstance;
    component.history = [
      { date: '2026-09-21', price18k: 40, price21k: 47, price22k: 49, price24k: 53 },
      { date: '2026-09-22', price18k: 41, price21k: 48, price22k: 50, price24k: 54 },
    ];

    expect(component.reversedHistory[0].date).toBe('2026-09-22');
  });
});
