import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYoutubeComponent } from '@src/app/components/edit/edit-youtube/edit-youtube.component';

describe('EditYoutubeComponent', () => {
  let component: EditYoutubeComponent;
  let fixture: ComponentFixture<EditYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYoutubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
