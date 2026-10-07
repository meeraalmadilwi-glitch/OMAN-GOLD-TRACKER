import { TestBed } from '@angular/core/testing';
import { GoldPriceCard } from './gold-price-card';

describe('GoldPriceCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldPriceCard],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GoldPriceCard);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the Arabic karat label and formatted price', () => {
    const fixture = TestBed.createComponent(GoldPriceCard);
    fixture.componentInstance.karat = '24K';
    fixture.componentInstance.price = 53.84;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('عيار 24');
    expect(compiled.textContent).toContain('53.840');
  });
});
