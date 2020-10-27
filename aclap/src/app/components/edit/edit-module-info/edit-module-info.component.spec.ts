import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModuleInfoComponent } from '@src/app/components/edit/edit-module-info/edit-module-info.component';

xdescribe('EditModuleInfoComponent', () => {
  let component: EditModuleInfoComponent;
  let fixture: ComponentFixture<EditModuleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModuleInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModuleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
