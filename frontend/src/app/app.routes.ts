import { Routes } from '@angular/router';
import { NotAuthenticateddeGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [

  {
    path:'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch:[
      // ()=>{
      // console.log('hola mundo');
      // return true
      // },
      NotAuthenticateddeGuard,
    ]
  },

  {
  path: 'admin',
  loadChildren: () =>
    import('./admin-dashboard/admin-dashboard.routes').then(
      (m) => m.adminDashboardRoutes
    ),
},

  {
    path: '',
    loadChildren: () =>
      import('./store-front/store-front.routes').then(
        (m) => m.storeFrontRoutes
      ),
  },
];
