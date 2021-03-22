import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobForOperatorComponent } from './job-for-operator.component';

describe('JobForOperatorComponent', () => {
  let component: JobForOperatorComponent;
  let fixture: ComponentFixture<JobForOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobForOperatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobForOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
