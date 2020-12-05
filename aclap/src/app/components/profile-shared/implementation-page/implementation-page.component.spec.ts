import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationPageComponent } from '@src/app/components/profile-shared/implementation-page/implementation-page.component';

describe('ImplementationPageComponent', () => {
  let component: ImplementationPageComponent;
  let fixture: ComponentFixture<ImplementationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
