import { lazy } from 'react';
import Resturant from '../pages/resturant/Resturant';
import PendingRestaurant from '../pages/resturant/notAccepterRestaurant'
const Index = lazy(() => import('../pages/Index'));
const Delivery = lazy(() => import('../pages/delivery/DeliveryPage'));
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
    },
    {
        path: '/commands',
        element: <Delivery />
    },
    {
        path: '/dashboard/Restaurants',
        element: <Resturant />,
        layout: 'default',
    },
    {
        path: '/dashboard/pendingrestaurants',
        element: <PendingRestaurant/>,
        layout: 'default',
    }
];

export { routes };
