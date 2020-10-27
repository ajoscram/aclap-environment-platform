import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageComponent } from '@src/app/components/edit/edit-image/edit-image.component';

xdescribe('EditImageComponent', () => {
  let component: EditImageComponent;
  let fixture: ComponentFixture<EditImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
