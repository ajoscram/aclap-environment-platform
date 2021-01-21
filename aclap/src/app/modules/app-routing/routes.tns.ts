import { Routes } from '@angular/router';


import { HomeComponent } from '../../components/home/home.component.tns';
import { ModulesComponent } from '../../components/module-shared/modules/modules.component';
import { ModulePageComponent } from '../../components/module-shared/module-page/module-page.component';
import { DisplayerComponent } from '../../components/section-shared/display/displayer/displayer.component';
import { DisplayFilesComponent } from '../../components/section-shared/display/display-files/display-files.component';
import { ProfileComponent } from '../../components/profile-shared/profile/profile.component';
import { LoginComponent } from '../../components/shared/login/login.component';
import { EducatorApplicationComponent } from '../../components/profile-shared/educator-application/educator-application.component';
import { DisplayQuestionsComponent } from '../../components/section-shared/display/display-questions/display-questions.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        component: HomeComponent
    },
    {
        path: 'modulos',
        component: ModulesComponent
    },
    {
        path: 'modulos/:id',
        component: ModulePageComponent
    },
    {
        path: 'guia/:id',
        component: DisplayerComponent,
    },
    {
        path: 'material/:id',
        component: DisplayFilesComponent,
    },
    {
        path: 'preguntas/:id',
        component: DisplayQuestionsComponent,
    },
    {
        path: 'perfil',
        component: ProfileComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'educatorApplication',
        component: EducatorApplicationComponent,
    }
]