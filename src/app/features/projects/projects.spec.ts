import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects';
 
describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProjectsComponent] }).compileComponents();
    fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();
  });
  it('should create', () => { expect(fixture.componentInstance).toBeTruthy(); });
});