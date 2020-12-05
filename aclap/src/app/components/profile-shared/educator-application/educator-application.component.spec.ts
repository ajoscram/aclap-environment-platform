import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorApplicationComponent } from '@src/app/components/profile-shared/educator-application/educator-application.component';

describe('EducatorApplicationComponent', () => {
  let component: EducatorApplicationComponent;
  let fixture: ComponentFixture<EducatorApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducatorApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
