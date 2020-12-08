import { Routes } from '@angular/router';


import { HomeComponent } from '../../components/home/home.component.tns';
import { ModulesComponent } from '../../components/module-shared/modules/modules.component';
import { ModulePageComponent } from '../../components/module-shared/module-page/module-page.component';
import { ModuleEditComponent } from '../../components/module-shared/module-edit/module-edit.component';

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
        path: 'modulos/:id/editar',
        component: ModuleEditComponent
    }
];