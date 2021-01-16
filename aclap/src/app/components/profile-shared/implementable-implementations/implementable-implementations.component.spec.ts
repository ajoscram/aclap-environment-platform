import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementableImplementationsComponent } from '@src/app/components/profile-shared/implementable-implementations/implementable-implementations.component';

describe('ImplementableImplementationsComponent', () => {
  let component: ImplementableImplementationsComponent;
  let fixture: ComponentFixture<ImplementableImplementationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementableImplementationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementableImplementationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
