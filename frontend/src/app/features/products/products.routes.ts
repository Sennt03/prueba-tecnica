import { Routes } from "@angular/router";
import { ProductsComponent } from "./products";
import { validateIdProductGuard } from "@shared/guards/validate-id-product-guard";

export const ProductsRoutes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/overview/overview').then(c => c.Overview)
            },
            {
                path: 'create',
                loadComponent: () => import('./pages/form/form').then(c => c.Form)
            },
            {
                path: 'update/:id',
                loadComponent: () => import('./pages/form/form').then(c => c.Form),
                canActivate: [validateIdProductGuard]
            },
        ]
    }
]