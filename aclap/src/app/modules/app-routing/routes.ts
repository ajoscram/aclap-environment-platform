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
import { ImplementationPageComponent } from '../../components/profile-shared/implementation-page/implementation-page.component';
import { ImplementableImplementationsComponent } from '../../components/profile-shared/implementable-implementations/implementable-implementations.component';
import { EventsComponent } from '../../components/event-shared/events/events.component';
import { EventPageComponent } from '../../components/event-shared/event-page/event-page.component';
import { EventEditComponent } from '../../components/event-shared/event-edit/event-edit.component';
import { CreateEventComponent } from '../../components/event-shared/create-event/create-event.component';
import { TGuideComponent } from '../../components/event-shared/teaching-guide/teaching-guide.component';
import { ImplementationDisplayComponent } from '@src/app/components/profile-shared/implementation-display/implementation-display.component';
import { AlliesComponent } from '@src/app/components/allies-shared/allies/allies.component';
import { AlliesEditComponent } from '@src/app/components/allies-shared/allies-edit/allies-edit.component';
import { ProfileEditComponent } from '@src/app/components/profile-shared/profile-edit/profile-edit.component';
import { PasswordEditComponent } from '@src/app/components/shared/password-edit/password-edit.component';
import { AboutUsComponent } from '@src/app/components/about-us/about-us.component';

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
    },
    {
        path: 'modulos/:id/nueva-implementacion',
        component: ImplementationPageComponent,
    },
    {
        path: 'perfil/:name/:id/implementaciones',
        component: ImplementableImplementationsComponent
    },
    {
        path: 'eventos',
        component: EventsComponent
    },
    {
        path: 'eventos/:id',
        component: EventPageComponent
    },
    {
        path: 'eventos/:id/editar',
        component: EventEditComponent
    },
    {
        path: 'eventos/:id/guia-didactica',
        component: TGuideComponent
    },
    {
        path: 'crear/evento',
        component: CreateEventComponent
    },
    {
        path: 'implementacion/ver/:id',
        component: ImplementationDisplayComponent
    },
    {
        path: 'aliados',
        component: AlliesComponent
    },
    {
        path: 'aliados/editar',
        component: AlliesEditComponent
    },
    {
        path: 'perfil/editar',
        component: ProfileEditComponent
    },
    {
        path: 'cambiar-contrasena',
        component: PasswordEditComponent
    },
    {
        path: 'acerca-de',
        component: AboutUsComponent
    }
];