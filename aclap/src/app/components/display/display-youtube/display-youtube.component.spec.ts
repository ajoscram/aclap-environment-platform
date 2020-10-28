import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayYoutubeComponent } from '@src/app/components/display/display-youtube/display-youtube.component';

xdescribe('DisplayYoutubeComponent', () => {
  let component: DisplayYoutubeComponent;
  let fixture: ComponentFixture<DisplayYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayYoutubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
