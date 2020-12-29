import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDisciplinesComponent } from '@src/app/components/module-shared/display/display-disciplines/display-disciplines.component';

describe('DisplayDisciplinesComponent', () => {
  let component: DisplayDisciplinesComponent;
  let fixture: ComponentFixture<DisplayDisciplinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDisciplinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
