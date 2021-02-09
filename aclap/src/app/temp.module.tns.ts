import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { DisplayerComponent } from './components/section-shared/display/displayer/displayer.component';
import { DisplayFilesComponent } from './components/section-shared/display/display-files/display-files.component';
import { ModulePageComponent } from './components/module-shared/module-page/module-page.component';
import { ModulesComponent } from './components/module-shared/modules/modules.component';
import { ProfileComponent } from './components/profile-shared/profile/profile.component';
import { LoginComponent } from './components/shared/login/login.component';
import { EducatorApplicationComponent } from './components/profile-shared/educator-application/educator-application.component';
import { DisplayQuestionsComponent } from './components/section-shared/display/display-questions/display-questions.component';
import { EventsComponent } from './components/event-shared/events/events.component';
import { EventPageComponent } from './components/event-shared/event-page/event-page.component';

@NgModule({
  declarations: [
    ModulePageComponent,
    ModulesComponent,
    ProfileComponent,
    DisplayerComponent,
    LoginComponent,
    DisplayFilesComponent,
    EducatorApplicationComponent,
    DisplayQuestionsComponent,
    EventsComponent,
    EventPageComponent,
  ],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TempModule { }
