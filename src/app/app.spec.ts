import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { API_BASE_URL } from './config/api.config';

describe('App', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('سعر الذهب اليوم في عُمان');
  });

  it('shows the prices returned by the API', async () => {
    const fixture = TestBed.createComponent(App);
    http.expectOne(`${API_BASE_URL}/prices`).flush([
      { karat: 24, pricePerGram: 53.84, currency: 'OMR' },
      { karat: 18, pricePerGram: 40.38, currency: 'OMR' },
    ]);
    http.expectOne(`${API_BASE_URL}/prices/history`).flush([]);
    await fixture.whenStable();

    expect(fixture.componentInstance.goldPrices.map((p) => p.karat)).toEqual(['18K', '24K']);
    expect(fixture.componentInstance.goldPrices[1].price).toBe(53.84);
    http.verify();
  });

  it('shows an error message when the API is unreachable', async () => {
    const fixture = TestBed.createComponent(App);
    http.expectOne(`${API_BASE_URL}/prices`).error(new ProgressEvent('error'));
    http.expectOne(`${API_BASE_URL}/prices/history`).error(new ProgressEvent('error'));
    await fixture.whenStable();

    expect(fixture.componentInstance.hasError).toBe(true);
    expect((fixture.nativeElement as HTMLElement).querySelector('[role="alert"]')).not.toBeNull();
  });
});
