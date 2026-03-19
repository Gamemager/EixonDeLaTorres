import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Elite } from './elite';

describe('Elite', () => {
  let component: Elite;
  let fixture: ComponentFixture<Elite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Elite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Elite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
