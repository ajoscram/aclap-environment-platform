import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { DatePipe } from '@angular/common';

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
import { DisplayActivityComponent } from '@src/app/components/section-shared/display/display-activity/display-activity.component';
import { DisplayTitleComponent } from '@src/app/components/section-shared/display/display-title/display-title.component';
import { DisplayParagraphComponent } from '@src/app/components/section-shared/display/display-paragraph/display-paragraph.component';
import { DisplayYoutubeComponent } from '@src/app/components/section-shared/display/display-youtube/display-youtube.component';
import { DisplayerComponent } from '@src/app/components/section-shared/display/displayer/displayer.component';
import { EditDisplayerComponent } from '@src/app/components/section-shared/edit/edit-displayer/edit-displayer.component';
import { LoginComponent } from '@src/app/components/shared/login/login.component';

import { DisplayImageComponent } from '@src/app/components/section-shared/display/display-image/display-image.component';
import { AboutUsComponent } from '@src/app/components/about-us/about-us.component';
import { AlliesComponent } from '@src/app/components/allies-shared/allies/allies.component';

import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

import { Controller } from '@src/app/services/control/Controller.service';
import { Factory } from '@src/app/services/database/factory/Factory.service';
import { DefaultController } from '@src/app/services/control/DefaultController.service';
import { Database } from '@src/app/services/database/Database.service';
import { Authenticator } from '@src/app/services/authentication/Authenticator.service';
import { Storage } from '@src/app/services/storage/Storage.service';
import { MockAuthenticator } from '@src/app/services/authentication/mock/MockAuthenticator.service';
import { MockDatabase } from '@src/app/services/database/MockDatabase.service';
import { MockStorage } from '@src/app/services/storage/MockStorage.service';
import { Validator } from './services/database/validation/Validator.service';
import ControlModule from '@src/app/modules/control/control.module';

import { TempModule } from './temp.module.tns';

import { FirebaseDatabase } from '@src/app/services/database/firebase/FirebaseDatabase.service';
import { FirebaseStorage } from '@src/app/services/storage/FirebaseStorage.service';
import { FirebaseAuthenticator } from '@src/app/services/authentication/firebase/FirebaseAuthenticator.service';
import { environment } from '@src/environments/environment';

environment.production = global.production;

console.log("environment.production");
console.log(environment.production);

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
    DisplayActivityComponent,
    DisplayTitleComponent,
    DisplayParagraphComponent,
    DisplayYoutubeComponent,
    DisplayerComponent,
    EditDisplayerComponent,
    LoginComponent,
    //DisplayImageComponent,
    //AboutUsComponent,
    //AlliesComponent
  ],
  imports: [
    TempModule,
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    ControlModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
    NativeScriptCommonModule
  ],
  providers: [
    { provide: Controller, useClass: DefaultController },
    { provide: DatePipe, useClass: DatePipe },
    { provide: Factory },
    { provide: Validator },
    { provide: ErrorTranslator },
    { provide: Database, useClass: global.production ? FirebaseDatabase : MockDatabase },
    { provide: Storage, useClass: global.production ? FirebaseStorage : MockStorage },
    { provide: Authenticator, useClass: global.production ? FirebaseAuthenticator : MockAuthenticator }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [LoginComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
