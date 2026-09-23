import type { Routes } from "@angular/router";
import { AdminDashboardLayouts } from "./layouts/admin-dashboard-layouts/admin-dashboard-layouts";
import { ProductAdminPage } from "./pages/product-admin-page/product-admin-page";
import { ProductsAdminPage } from "./pages/products-admin-page/products-admin-page";
import { IsAdminGuard } from "@auth/guards/is-admin.guard";

export const adminDashboardRoutes: Routes = [
  {
    path : '',
    component:AdminDashboardLayouts,
    // canMatch:[
    //   IsAdminGuard,
    // ],
    children:[
      {
        path:'products',
        component: ProductsAdminPage
      },
      {
        path:'products/:id',
        component: ProductAdminPage
      },

      {
        path:'**',
        redirectTo:'products',
      }
    ]
  },

]

export default adminDashboardRoutes;
