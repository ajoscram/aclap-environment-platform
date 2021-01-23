import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationDisplayComponent } from '@src/app/components/profile-shared/implementation-display/implementation-display.component';

describe('ImplementationDisplayComponent', () => {
  let component: ImplementationDisplayComponent;
  let fixture: ComponentFixture<ImplementationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementationDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
