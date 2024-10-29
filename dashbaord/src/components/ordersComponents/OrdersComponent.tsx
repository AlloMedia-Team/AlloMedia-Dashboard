interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    clientId: {
        _id: string;
        userName: string;
    };
    items: OrderItem[];
    totalPrice: number;
    status: 'pending' | 'in_progress' | 'delivered' | 'cancelled';
    createdAt: string;
}

interface OrdersComponentProps {
    orders: Order[];
    onAssignDelivery: (orderId: string) => void;
    refuseOrder: (orderId: string) => void;

}

const OrdersComponent: React.FC<OrdersComponentProps> = ({ orders, onAssignDelivery, refuseOrder }) => {

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500 dark:bg-yellow-600';
            case 'in_progress':
                return 'bg-blue-500 dark:bg-blue-600';
            case 'delivered':
                return 'bg-green-500 dark:bg-green-600';
            case 'cancelled':
                return 'bg-red-500 dark:bg-red-600';
            default:
                return 'bg-gray-500 dark:bg-gray-600';
        }
    };

    return (
        <div className={`w-full max-w-6xl mx-auto`}>
            <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-200`}>
                <div className={`px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center`}>
                    <h2 className={`text-xl font-semibold text-gray-800 dark:text-gray-100`}>Restaurant Orders</h2>
                </div>
                <div className="p-6">
                    <div className="overflow-x-aut overflow-auto" style={{ maxHeight: '400px' }}>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className={`bg-gray-50 dark:bg-gray-700`}>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Customer</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Items</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Total</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Status</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Time</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Validate order</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Refuse order</th>

                                </tr>
                            </thead>
                            <tbody className={`bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700`}>
                                {orders.length === 0 &&
                                    <div className='w-full flex justify-center p-4'>
                                        <span>There is no order right now</span>
                                    </div>
                                }
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300`}>{order.clientId.userName}</td>
                                        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300`}>
                                            <ul className="list-disc list-inside">
                                                {order.items.map((item, index) => (
                                                    <li key={index}>
                                                        {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300`}>${order.totalPrice.toFixed(2)}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300`}>
                                            {new Date(order.createdAt).toLocaleString()}
                                        </td>
                                        <td className={`px-4 py-2 whitespace-nowrap`}>
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                                onClick={() => onAssignDelivery(order._id)}
                                                disabled={order.status !== 'pending' ? true: false}
                                            >
                                                Assign Delivery
                                            </button>
                                        </td>
                                        <td className={`px-4 py-2 whitespace-nowrap`}>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => refuseOrder(order._id)}
                                                disabled={order.status !== 'pending' ? true: false}
                                            >
                                                Refuse Order
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrdersComponent;
