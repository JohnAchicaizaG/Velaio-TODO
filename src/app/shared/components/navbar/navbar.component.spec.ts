import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display logo', () => {
    const logo = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(logo.src).toContain('velaio-logo.png');
  });

  it('should display Prueba Tecnica link', () => {
    const link = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(link.textContent).toBe('Prueba Tecnica');
  });


});
