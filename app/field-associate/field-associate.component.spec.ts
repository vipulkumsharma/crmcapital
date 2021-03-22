import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAssociateComponent } from './field-associate.component';

describe('FieldAssociateComponent', () => {
  let component: FieldAssociateComponent;
  let fixture: ComponentFixture<FieldAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldAssociateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
