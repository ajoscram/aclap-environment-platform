import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePageComponent } from '@src/app/components/module-page/module-page.component';

xdescribe('ModulePageComponent', () => {
  let component: ModulePageComponent;
  let fixture: ComponentFixture<ModulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
