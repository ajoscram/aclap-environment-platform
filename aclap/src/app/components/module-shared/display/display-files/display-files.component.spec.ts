import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFilesComponent } from '@src/app/components/module-shared/display/display-files/display-files.component';

describe('DisplayFilesComponent', () => {
  let component: DisplayFilesComponent;
  let fixture: ComponentFixture<DisplayFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
