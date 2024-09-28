import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display developer name', () => {
    const developerName = fixture.debugElement.query(By.css('span.font-semibold')).nativeElement.textContent;
    expect(developerName).toBe('John Alexander Chicaiza Gavilanes');
  });

  it('should display email', () => {
    const email = fixture.debugElement.query(By.css('a.text-blue-400')).nativeElement.textContent;
    expect(email).toBe('jachicaiza@outlook.com');
  });

  it('should display technologies', () => {
    const technologies = fixture.debugElement.queryAll(By.css('p'))[2].nativeElement.textContent;
    expect(technologies).toContain('Angular v.16, Tailwind CSS, TypeScript');
  });

  it('should display GitHub link', () => {
    const githubLink = fixture.debugElement.queryAll(By.css('a'))[1].nativeElement.getAttribute('href');
    expect(githubLink).toBe('https://github.com/JohnAchicaizaG');
  });

  it('should display LinkedIn link', () => {
    const linkedinLink = fixture.debugElement.queryAll(By.css('a'))[2].nativeElement.getAttribute('href');
    expect(linkedinLink).toBe('https://www.linkedin.com/in/jachicaizag92/');
  });


});
