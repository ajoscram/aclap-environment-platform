import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCardListComponent } from '@src/app/components/module-card-list/module-card-list.component';

xdescribe('ModuleCardListComponent', () => {
  let component: ModuleCardListComponent;
  let fixture: ComponentFixture<ModuleCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
