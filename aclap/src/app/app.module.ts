import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '@src/app/modules/app-routing/app-routing.module';
import { AppComponent } from '@src/app/components/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from '@src/app/components/home/home.component';
import { HeaderComponent } from '@src/app/components/shared/header/header.component';
import { FooterComponent } from '@src/app/components/shared/footer/footer.component';
import { ModulesComponent } from '@src/app/components/module-shared/modules/modules.component';
import { ModulePageComponent } from '@src/app/components/module-shared/module-page/module-page.component';
import { ModuleEditComponent } from '@src/app/components/module-shared/module-edit/module-edit.component';
import { ModuleCardComponent } from '@src/app/components/module-shared/module-card/module-card.component';
import { EditTitleComponent } from '@src/app/components/module-shared/edit/edit-title/edit-title.component';
import { EditParagraphComponent } from '@src/app/components/module-shared/edit/edit-paragraph/edit-paragraph.component';
import { EditActivityComponent } from '@src/app/components/module-shared/edit/edit-activity/edit-activity.component';
import { EditModuleInfoComponent } from '@src/app/components/module-shared/edit/edit-module-info/edit-module-info.component';
import { EditImageComponent } from '@src/app/components/module-shared/edit/edit-image/edit-image.component';
import { EditYoutubeComponent } from '@src/app/components/module-shared/edit/edit-youtube/edit-youtube.component';
import { ModuleCardListComponent } from '@src/app/components/module-shared/module-card-list/module-card-list.component';
import { DisciplineComponent } from '@src/app/components/discipline/discipline.component';
import { DisplayImageComponent } from '@src/app/components/module-shared/display/display-image/display-image.component';
import { DisplayActivityComponent } from '@src/app/components/module-shared/display/display-activity/display-activity.component';
import { DisplayTitleComponent } from '@src/app/components/module-shared/display/display-title/display-title.component';
import { DisplayParagraphComponent } from '@src/app/components/module-shared/display/display-paragraph/display-paragraph.component';
import { DisplayYoutubeComponent } from '@src/app/components/module-shared/display/display-youtube/display-youtube.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import ControlModule from '@src/app/modules/control/control.module';
import { Controller } from '@src/app/services/control/Controller.service';
import { DefaultController } from '@src/app/services/control/DefaultController.service';
import { Database } from '@src/app/services/database/Database.service';
import { Authenticator } from '@src/app/services/authentication/Authenticator.service';
import { Storage } from '@src/app/services/storage/Storage.service';
import { MockAuthenticator } from '@src/app/services/authentication/mock/MockAuthenticator.service';
import { MockDatabase } from '@src/app/services/database/MockDatabase.service';
import { MockStorage } from '@src/app/services/storage/MockStorage.service';
import { DisplayerComponent } from '@src/app/components/module-shared/display/displayer/displayer.component';
import { EditDisplayerComponent } from '@src/app/components/module-shared/edit/edit-displayer/edit-displayer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '@src/app/components/shared/login/login.component';
import { RegisterComponent } from '@src/app/components/shared/register/register.component';
import { AboutUsComponent } from '@src/app/components/about-us/about-us.component';
import { CreateModuleComponent} from '@src/app/components/module-shared/create-module/create-module.component';
import { EditDisciplinesComponent } from '@src/app/components/module-shared/edit/edit-disciplines/edit-disciplines.component';
import { EducatorApplicationComponent } from '@src/app/components/profile-shared/educator-application/educator-application.component';
import { ImplementableListComponent } from '@src/app/components/profile-shared/implementable-list/implementable-list.component';
import { ImplementableStatComponent } from '@src/app/components/profile-shared/implementable-stat/implementable-stat.component';
import { ImplementationEditComponent } from '@src/app/components/profile-shared/implementation-edit/implementation-edit.component';
import { ImplementationPageComponent } from '@src/app/components/profile-shared/implementation-page/implementation-page.component';
import { ProfileComponent } from '@src/app/components/profile-shared/profile/profile.component';
import { EditQuestionsComponent } from '@src/app/components/module-shared/edit/edit-questions/edit-questions.component';

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
    AboutUsComponent,
    CreateModuleComponent,
    EditDisciplinesComponent,
    EditQuestionsComponent,
    EducatorApplicationComponent,
    ImplementableListComponent,
    ImplementableStatComponent,
    ImplementationEditComponent,
    ImplementationPageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    NgbModule,
    ControlModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: Controller, useClass: DefaultController },
    { provide: Database, useClass: MockDatabase },
    { provide: Storage, useClass: MockStorage },
    { provide: Authenticator, useClass: MockAuthenticator }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [LoginComponent]
})
export class AppModule { }