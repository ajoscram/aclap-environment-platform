import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationListComponent } from '@src/app/components/profile-shared/implementation-list/implementation-list.component';

describe('ImplementationListComponent', () => {
  let component: ImplementationListComponent;
  let fixture: ComponentFixture<ImplementationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
