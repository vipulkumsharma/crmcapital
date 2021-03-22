import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUplodeComponent } from './bulk-uplode.component';

describe('BulkUplodeComponent', () => {
  let component: BulkUplodeComponent;
  let fixture: ComponentFixture<BulkUplodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUplodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUplodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
