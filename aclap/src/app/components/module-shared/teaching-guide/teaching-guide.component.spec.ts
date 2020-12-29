import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingGuideComponent } from '@src/app/components/module-shared/teaching-guide/teaching-guide.component';

describe('TeachingGuideComponent', () => {
  let component: TeachingGuideComponent;
  let fixture: ComponentFixture<TeachingGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachingGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
