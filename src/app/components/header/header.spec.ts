import { TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the brand name', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('الذهب العُماني');
  });

  it('should show the demo-data badge', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('بيانات تجريبية');
  });

  it('should toggle the theme when the button is clicked', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const before = fixture.componentInstance.isDark;
    const button = (fixture.nativeElement as HTMLElement).querySelector('button') as HTMLButtonElement;
    button.click();
    expect(fixture.componentInstance.isDark).toBe(!before);
  });
});
