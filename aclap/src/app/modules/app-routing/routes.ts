import { Routes } from '@angular/router';


import { HomeComponent } from '../../components/home/home.component';
import { ModulesComponent } from '../../components/modules/modules.component';
import { ModulePageComponent } from '../../components/module-page/module-page.component';
import { ModuleEditComponent } from '../../components/module-edit/module-edit.component';
import { CreateModuleComponent } from '../../components/create-module/create-module.component';
import { ImplementableStatComponent } from '../../components/profile-shared/implementable-stat/implementable-stat.component';
import { ImplementationEditComponent } from '../../components/profile-shared/implementation-edit/implementation-edit.component';
import { ProfileComponent } from '../../components/profile-shared/profile/profile.component';

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
    }
];