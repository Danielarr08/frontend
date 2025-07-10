import { Routes } from '@angular/router';

import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { AgregarMascotaComponent } from './pages/agregar-mascota/agregar-mascota.component';
import { EditarMascotaComponent } from './pages/editar-mascota/editar-mascota.component';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listar-mascotas'
    },
    {
        path: 'listar-mascotas',
        component: ListaMascotasComponent
    },
    {
        path: 'agregar-mascota',
        component: AgregarMascotaComponent
    },
    {
        path: 'editar-mascota/:id',
        component: EditarMascotaComponent
    },
    {
        path: '**',
        redirectTo: 'listar-mascotas'
    }
];
