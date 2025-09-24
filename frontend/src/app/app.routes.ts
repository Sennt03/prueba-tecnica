import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes').then(m => m.ProductsRoutes)
    },
    {
        path: '**',
        redirectTo: '/products'
    }
];
