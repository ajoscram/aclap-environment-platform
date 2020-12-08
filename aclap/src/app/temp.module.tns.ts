import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ModulePageComponent } from './components/module-shared/module-page/module-page.component';
import { ModulesComponent } from './components/module-shared/modules/modules.component';



@NgModule({
  declarations: [
    ModulePageComponent,
    ModulesComponent,
  ],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TempModule { }
