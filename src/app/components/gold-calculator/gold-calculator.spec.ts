import { TestBed } from '@angular/core/testing';
import { GoldCalculator } from './gold-calculator';

describe('GoldCalculator', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldCalculator],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GoldCalculator);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should calculate the gold value for the selected karat and weight', () => {
    const fixture = TestBed.createComponent(GoldCalculator);
    const component = fixture.componentInstance;
    component.goldPrices = [{ karat: '21K', price: 47.1 }];
    component.selectedKarat = '21K';
    component.grams = 10;

    component.calculateGoldValue();

    expect(component.totalValue).toBe(471);
    expect(component.hasCalculated).toBe(true);
  });

  it('should not calculate when the weight is empty, zero, negative or not a number', () => {
    const fixture = TestBed.createComponent(GoldCalculator);
    const component = fixture.componentInstance;
    component.goldPrices = [{ karat: '21K', price: 47.1 }];

    for (const invalid of [null, 0, -5, NaN, Infinity]) {
      component.grams = invalid;
      component.calculateGoldValue();

      expect(component.isValidWeight).toBe(false);
      expect(component.hasCalculated).toBe(false);
      expect(component.totalValue).toBe(0);
    }
  });

  it('should accept decimal weights', () => {
    const fixture = TestBed.createComponent(GoldCalculator);
    const component = fixture.componentInstance;
    component.goldPrices = [{ karat: '24K', price: 53.84 }];
    component.selectedKarat = '24K';
    component.grams = 2.5;

    component.calculateGoldValue();

    expect(component.isValidWeight).toBe(true);
    expect(component.totalValue).toBeCloseTo(134.6, 3);
  });

  // --- UI tests: drive the component like a real user (typing, choosing, clicking).
  // Changing a property directly does not re-render in a zoneless test, events do.

  async function setup() {
    const fixture = TestBed.createComponent(GoldCalculator);
    fixture.componentInstance.goldPrices = [
      { karat: '21K', price: 47.1 },
      { karat: '24K', price: 53.84 },
    ];
    fixture.detectChanges();
    await fixture.whenStable();

    const root = fixture.nativeElement as HTMLElement;
    const refresh = async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
    };

    return {
      fixture,
      component: fixture.componentInstance,
      root,
      button: root.querySelector('button') as HTMLButtonElement,
      async type(value: string) {
        const input = root.querySelector('#grams') as HTMLInputElement;
        input.value = value;
        input.dispatchEvent(new Event('input'));
        await refresh();
      },
      async pick(karat: string) {
        const select = root.querySelector('#karat') as HTMLSelectElement;
        select.value = karat;
        select.dispatchEvent(new Event('change'));
        await refresh();
      },
      async calculate() {
        (root.querySelector('button') as HTMLButtonElement).click();
        await refresh();
      },
      text: () => (root.textContent ?? '').replace(/\s+/g, ' '),
    };
  }

  it('should keep the shown result consistent when the inputs change after calculating', async () => {
    const ui = await setup();

    await ui.calculate();
    expect(ui.text()).toContain('10 جرام من عيار 21');
    expect(ui.text()).toContain('471.000 ريال عُماني');

    // the user edits the inputs but has not pressed the button again
    await ui.type('99');
    await ui.pick('24K');
    expect(ui.text()).toContain('10 جرام من عيار 21');
    expect(ui.text()).toContain('471.000 ريال عُماني');
    expect(ui.text()).not.toContain('99 جرام');

    // pressing the button again updates the card
    await ui.calculate();
    expect(ui.text()).toContain('99 جرام من عيار 24');
    expect(ui.text()).toContain('5330.160 ريال عُماني');
  });

  it('should disable the button and show a message while the weight is invalid', async () => {
    const ui = await setup();
    const alert = () => ui.root.querySelector('[role="alert"]');

    expect(ui.button.disabled).toBe(false);
    expect(alert()).toBeNull();

    for (const invalid of ['-3', '0', '']) {
      await ui.type(invalid);
      expect(ui.button.disabled).toBe(true);
      expect(alert()?.textContent).toContain('يُرجى إدخال وزن صالح أكبر من صفر');
    }

    // a disabled button cannot produce a result
    await ui.calculate();
    expect(ui.component.hasCalculated).toBe(false);

    await ui.type('2.5');
    expect(ui.button.disabled).toBe(false);
    expect(alert()).toBeNull();
    await ui.calculate();
    expect(ui.text()).toContain('117.750 ريال عُماني');
  });
});
