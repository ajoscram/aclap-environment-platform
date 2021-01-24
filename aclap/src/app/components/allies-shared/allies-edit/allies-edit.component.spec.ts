import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlliesEditComponent } from '@src/app/components/allies-shared/allies-edit/allies-edit.component';

describe('AlliesEditComponent', () => {
  let component: AlliesEditComponent;
  let fixture: ComponentFixture<AlliesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlliesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlliesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
