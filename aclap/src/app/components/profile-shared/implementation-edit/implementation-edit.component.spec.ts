import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationEditComponent } from '@src/app/components/profile-shared/implementation-edit/implementation-edit.component';

describe('ImplementationEditComponent', () => {
  let component: ImplementationEditComponent;
  let fixture: ComponentFixture<ImplementationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
