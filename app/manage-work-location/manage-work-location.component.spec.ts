import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkLocationComponent } from './manage-work-location.component';

describe('ManageWorkLocationComponent', () => {
  let component: ManageWorkLocationComponent;
  let fixture: ComponentFixture<ManageWorkLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWorkLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
