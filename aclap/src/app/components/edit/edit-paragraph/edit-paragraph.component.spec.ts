import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParagraphComponent } from '@src/app/components/edit/edit-paragraph/edit-paragraph.component';

xdescribe('EditParagraphComponent', () => {
  let component: EditParagraphComponent;
  let fixture: ComponentFixture<EditParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParagraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
