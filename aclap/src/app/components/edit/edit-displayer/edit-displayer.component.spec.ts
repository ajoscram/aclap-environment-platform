import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisplayerComponent } from '@src/app/components/edit/edit-displayer/edit-displayer.component';

describe('EditDisplayerComponent', () => {
  let component: EditDisplayerComponent;
  let fixture: ComponentFixture<EditDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
