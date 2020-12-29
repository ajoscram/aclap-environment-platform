import { Routes } from '@angular/router';


import { HomeComponent } from '../../components/home/home.component';
import { ModulesComponent } from '../../components/module-shared/modules/modules.component';
import { ModulePageComponent } from '../../components/module-shared/module-page/module-page.component';
import { ModuleEditComponent } from '../../components/module-shared/module-edit/module-edit.component';
import { CreateModuleComponent } from '../../components/module-shared/create-module/create-module.component';
import { ImplementableStatComponent } from '../../components/profile-shared/implementable-stat/implementable-stat.component';
import { ImplementationEditComponent } from '../../components/profile-shared/implementation-edit/implementation-edit.component';
import { ProfileComponent } from '../../components/profile-shared/profile/profile.component';
import { LoginComponent } from '@src/app/components/shared/login/login.component';
import { RegisterComponent} from '@src/app/components/shared/register/register.component';
import { TeachingGuideComponent} from '../../components/module-shared/teaching-guide/teaching-guide.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
    },
    {
        path: 'inicio',
        component: HomeComponent,
    },
    {
        path: 'modulos',
        component: ModulesComponent,
    },
    {
        path: 'modulos/:id',
        component: ModulePageComponent,
    },
    {
        path: 'modulos/:id/editar',
        component: ModuleEditComponent,
    },
    {
        path: 'modulos/:id/guia-didactica',
        component: TeachingGuideComponent
    },
    {
        path: 'crear/modulo',
        component: CreateModuleComponent,
    },
    {
        path: 'perfil',
        component: ProfileComponent,
    },
    {
        path: 'implementable/estadisticas/:id',
        component: ImplementableStatComponent,
    },
    {
        path: 'implementacion/editar/:id',
        component: ImplementationEditComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'persona-educadora',
        component: RegisterComponent,
    }
];