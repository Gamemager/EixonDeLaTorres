import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliteComponent } from './elite';

describe('Elite', () => {
  let component: EliteComponent;
  let fixture: ComponentFixture<EliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
