import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { DisplayerComponent } from './components/module-shared/display/displayer/displayer.component';
import { ModulePageComponent } from './components/module-shared/module-page/module-page.component';
import { ModulesComponent } from './components/module-shared/modules/modules.component';
import { ProfileComponent } from './components/profile-shared/profile/profile.component';

@NgModule({
  declarations: [
    ModulePageComponent,
    ModulesComponent,
    ProfileComponent,
    DisplayerComponent,
  ],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TempModule { }
