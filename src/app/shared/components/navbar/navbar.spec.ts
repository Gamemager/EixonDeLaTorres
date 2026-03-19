import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';
import { RouterTestingModule } from '@angular/router/testing';
 
describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
  });
  it('should create', () => { expect(fixture.componentInstance).toBeTruthy(); });
});