import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from '@src/app/modules/app-routing/app-routing.module.tns';
import { AppComponent } from '@src/app/components/app.component';
import { HomeComponent } from '@src/app/components/home/home.component';
import { HeaderComponent } from '@src/app/components/header/header.component';
import { FooterComponent } from '@src/app/components/footer/footer.component';
import { ModulesComponent } from '@src/app/components/modules/modules.component';
import { ModulePageComponent } from '@src/app/components/module-page/module-page.component';
import { ModuleEditComponent } from '@src/app/components/module-edit/module-edit.component';
import { ModuleCardComponent } from '@src/app/components/module-card/module-card.component';
import { EditTitleComponent } from '@src/app/components/edit/edit-title/edit-title.component';
import { EditParagraphComponent } from '@src/app/components/edit/edit-paragraph/edit-paragraph.component';
import { EditActivityComponent } from '@src/app/components/edit/edit-activity/edit-activity.component';
import { EditModuleInfoComponent } from '@src/app/components/edit/edit-module-info/edit-module-info.component';
import { EditImageComponent } from '@src/app/components/edit/edit-image/edit-image.component';
import { EditYoutubeComponent } from '@src/app/components/edit/edit-youtube/edit-youtube.component';
import { ModuleCardListComponent } from '@src/app/components/module-card-list/module-card-list.component';
import { DisciplineComponent } from '@src/app/components/discipline/discipline.component';
import { DisplayImageComponent } from '@src/app/components/display/display-image/display-image.component';
import { DisplayActivityComponent } from '@src/app/components/display/display-activity/display-activity.component';
import { DisplayTitleComponent } from '@src/app/components/display/display-title/display-title.component';
import { DisplayParagraphComponent } from '@src/app/components/display/display-paragraph/display-paragraph.component';
import { DisplayYoutubeComponent } from '@src/app/components/display/display-youtube/display-youtube.component';
import { DisplayerComponent } from '@src/app/components/display/displayer/displayer.component';


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
    DisplayerComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
