import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementableStatComponent } from '@src/app/components/profile-shared/implementable-stat/implementable-stat.component';

describe('ImplementableStatComponent', () => {
  let component: ImplementableStatComponent;
  let fixture: ComponentFixture<ImplementableStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementableStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementableStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
