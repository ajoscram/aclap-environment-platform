import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivityComponent } from '@src/app/components/edit/edit-activity/edit-activity.component';

xdescribe('EditActivityComponent', () => {
  let component: EditActivityComponent;
  let fixture: ComponentFixture<EditActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
