import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Menu = lazy(() => import('../pages/menu/Menu'));
const Orders = lazy(() => import('../pages/order/OrderPage'))

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/menus',
        element: <Menu />,
        layout: 'default',
    },
    {
        path: '/orders',
        element: <Orders />
    }

];

export { routes };
