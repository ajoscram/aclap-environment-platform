import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAllyComponent } from '@src/app/components/section-shared/edit/edit-ally/edit-ally.component';

describe('EditAllyComponent', () => {
  let component: EditAllyComponent;
  let fixture: ComponentFixture<EditAllyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAllyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAllyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
