import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from '@nativescript/angular'

import { AppRoutingModule } from '@src/app/modules/app-routing/app-routing.module';
import { AppComponent } from '@src/app/components/app.component';
import { HomeComponent } from '@src/app/components/home/home.component';
import { HeaderComponent } from '@src/app/components/shared/header/header.component';
import { FooterComponent } from '@src/app/components/shared/footer/footer.component';
import { ModulesComponent } from '@src/app/components/module-shared/modules/modules.component';
import { ModulePageComponent } from '@src/app/components/module-shared/module-page/module-page.component';
import { ModuleEditComponent } from '@src/app/components/module-shared/module-edit/module-edit.component';
import { ModuleCardComponent } from '@src/app/components/module-shared/module-card/module-card.component';
import { EditTitleComponent } from '@src/app/components/section-shared/edit/edit-title/edit-title.component';
import { EditParagraphComponent } from '@src/app/components/section-shared/edit/edit-paragraph/edit-paragraph.component';
import { EditActivityComponent } from '@src/app/components/section-shared/edit/edit-activity/edit-activity.component';
import { EditModuleInfoComponent } from '@src/app/components/section-shared/edit/edit-module-info/edit-module-info.component';
import { EditImageComponent } from '@src/app/components/section-shared/edit/edit-image/edit-image.component';
import { EditYoutubeComponent } from '@src/app/components/section-shared/edit/edit-youtube/edit-youtube.component';
import { ModuleCardListComponent } from '@src/app/components/module-shared/module-card-list/module-card-list.component';
import { DisciplineComponent } from '@src/app/components/discipline/discipline.component';
import { DisplayImageComponent } from '@src/app/components/section-shared/display/display-image/display-image.component';
import { DisplayActivityComponent } from '@src/app/components/section-shared/display/display-activity/display-activity.component';
import { DisplayTitleComponent } from '@src/app/components/section-shared/display/display-title/display-title.component';
import { DisplayParagraphComponent } from '@src/app/components/section-shared/display/display-paragraph/display-paragraph.component';
import { DisplayYoutubeComponent } from '@src/app/components/section-shared/display/display-youtube/display-youtube.component';
import { DisplayerComponent } from '@src/app/components/section-shared/display/displayer/displayer.component';
import { EditDisplayerComponent } from '@src/app/components/section-shared/edit/edit-displayer/edit-displayer.component';
import { LoginComponent } from '@src/app/components/shared/login/login.component';
import { RegisterComponent } from '@src/app/components/shared/register/register.component';
import { AboutUsComponent } from '@src/app/components/about-us/about-us.component';
import { ErrorTranslator } from '@src/app/services/ui/ErrorTranslator.service';
import { DatePipe } from '@angular/common';

import { Controller } from '@src/app/services/control/Controller.service';
import { Factory } from '@src/app/services/database/factory/Factory.service';
import { DefaultController } from '@src/app/services/control/DefaultController.service';
import { Database } from '@src/app/services/database/Database.service';
import { Authenticator } from '@src/app/services/authentication/Authenticator.service';
import { Storage } from '@src/app/services/storage/Storage.service';
import { MockAuthenticator } from '@src/app/services/authentication/mock/MockAuthenticator.service';
import { MockDatabase } from '@src/app/services/database/MockDatabase.service';
import { MockStorage } from '@src/app/services/storage/MockStorage.service';
import ControlModule from '@src/app/modules/control/control.module';


import { TempModule } from './temp.module.tns';

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ModulesComponent,
    ModulePageComponent,
    ModuleEditComponent,
    ModuleCardComponent,
    EditTitleComponent,
    EditParagraphComponent,
    EditActivityComponent,
    EditModuleInfoComponent,
    EditImageComponent,
    EditYoutubeComponent,
    ModuleCardListComponent,
    DisciplineComponent,
    DisplayImageComponent,
    DisplayActivityComponent,
    DisplayTitleComponent,
    DisplayParagraphComponent,
    DisplayYoutubeComponent,
    DisplayerComponent,
    EditDisplayerComponent,
    LoginComponent,
    RegisterComponent,
    AboutUsComponent
  ],
  imports: [
    TempModule,
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    ControlModule,
    ReactiveFormsModule,
    NativeScriptFormsModule
  ],
  providers: [
    { provide: Controller, useClass: DefaultController },
    { provide: Database, useClass: MockDatabase },
    { provide: Factory, useClass: Factory },
    { provide: Storage, useClass: MockStorage },
    { provide: Authenticator, useClass: MockAuthenticator },
    { provide: ErrorTranslator, useClass: ErrorTranslator },
    { provide: DatePipe, useClass: DatePipe }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [LoginComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
