import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayImageComponent } from '@src/app/components/display/display-image/display-image.component';

xdescribe('DisplayImageComponent', () => {
  let component: DisplayImageComponent;
  let fixture: ComponentFixture<DisplayImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
