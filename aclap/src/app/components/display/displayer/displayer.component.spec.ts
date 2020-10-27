import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayerComponent } from '@src/app/components/display/displayer/displayer.component';

xdescribe('DisplayerComponent', () => {
  let component: DisplayerComponent;
  let fixture: ComponentFixture<DisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
