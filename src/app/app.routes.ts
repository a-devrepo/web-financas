import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { Dashboard } from './pages/dashboard/dashboard';
import { CriarUsuario } from './pages/criar-usuario/criar-usuario';

export const routes: Routes = [
    {
        path: 'pages/autenticar',
        component: AutenticarUsuario
    },
    {
        path: 'pages/criar-usuario',
        component: CriarUsuario
    },
    {
        path: 'pages/dashboard',
        component: Dashboard
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: 'pages/autenticar'
    }
];