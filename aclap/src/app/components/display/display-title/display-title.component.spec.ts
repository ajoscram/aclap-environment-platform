import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTitleComponent } from '@src/app/components/display/display-title/display-title.component';

describe('DisplayTitleComponent', () => {
  let component: DisplayTitleComponent;
  let fixture: ComponentFixture<DisplayTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
