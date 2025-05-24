import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { CreateOfertaPageComponent } from './empresas-front/pages/create-oferta-page/create-oferta-page.component';
import { OfertaDetailsPageComponent } from './empresas-front/pages/oferta-details-page/oferta-details-page.component';
import { OfertaListPageComponent } from './alumnos-front/pages/oferta-list-page/oferta-list-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { ProfilePageComponent } from './shared/pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './shared/pages/settings-page/settings-page.component';

export const routes: Routes = [
    // Páginas de inicio de sesión y registro
    {
        path: 'iniciar-sesion',
        component: LoginPageComponent,
        canMatch: [NotAuthenticatedGuard]
    },
    {
        path: 'registrarse',
        component: RegisterPageComponent,
        canMatch: [NotAuthenticatedGuard]
    },
    {
        path: 'ofertas',
        component: OfertaListPageComponent,
        canMatch: [AuthenticatedGuard]

    },
    // Página de inicio y compartidas
    {
        path: '',
        component: HomePageComponent,
        canMatch: [AuthenticatedGuard]
    },
    {
        path: 'perfil',
        component: ProfilePageComponent,
        canMatch: [AuthenticatedGuard]
    },
    {
        path: 'ajustes',
        component: SettingsPageComponent,
        canMatch: [AuthenticatedGuard]
    },
    // Páginas específicas de empresas
    {
        path: 'crear-oferta',
        component: CreateOfertaPageComponent,
        canMatch: [AuthenticatedGuard]

    },
    {
        path: 'detalles-oferta/:id',
        component: OfertaDetailsPageComponent,
        canMatch: [AuthenticatedGuard]

    },
    // Página 404 Not Found
    {
        path: 'not-found',
        component: NotFoundPageComponent

    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
