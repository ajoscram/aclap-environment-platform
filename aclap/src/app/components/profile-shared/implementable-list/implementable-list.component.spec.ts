import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementableListComponent } from '@src/app/components/profile-shared/implementable-list/implementable-list.component';

describe('ImplementableListComponent', () => {
  let component: ImplementableListComponent;
  let fixture: ComponentFixture<ImplementableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
