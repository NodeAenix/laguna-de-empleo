import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { CreateOfertaPageComponent } from './empresas-front/pages/create-oferta-page/create-oferta-page.component';
import { OfertaDetailsPageComponent } from './empresas-front/pages/oferta-details-page/oferta-details-page.component';
import { OfertaListPageComponent } from './alumnos-front/pages/oferta-list-page/oferta-list-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';

export const routes: Routes = [
    // Página de inicio y autenticación
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'iniciar-sesion',
        component: LoginPageComponent
    },
    {
        path: 'registrarse',
        component: RegisterPageComponent
    },
    // Páginas específicas de empresas
    {
        path: 'crear-oferta',
        component: CreateOfertaPageComponent
    },
    {
        path: 'detalles-oferta/:id',
        component: OfertaDetailsPageComponent
    },
    // Páginas específicas de alumnos
    {
        path: 'ofertas',
        component: OfertaListPageComponent
    },
    // Página 404 Not Found
    {
        path: '**',
        component: NotFoundPageComponent
    }
];
