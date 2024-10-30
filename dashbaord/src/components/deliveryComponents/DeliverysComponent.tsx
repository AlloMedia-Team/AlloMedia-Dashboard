interface OrderItem {
    name: string;
    quantity: number;
    price: number;
} 

interface Order {
    items: OrderItem[];
}

interface Delivery {
    _id: string;
    orderId: Order;
    status: "assigned" | "refused" | "on_the_way" | "delivered";
    deliveredAt: Date;
    createdAt: Date;
}

interface DeliveryComponentProps {
    deliverys: Delivery[];
    refuseDelivery: (deliveryId: string) => void;
    handelAccepteDelivery: (deliveryId: string) => void
}

const DeliverysComponent: React.FC<DeliveryComponentProps> = ({ deliverys, refuseDelivery, handelAccepteDelivery }) => {

    const getStatusColor = (status: Delivery['status']) => {
        switch (status) {
            case 'assigned':
                return 'bg-yellow-500 dark:bg-yellow-600';
            case 'on_the_way':
                return 'bg-blue-500 dark:bg-blue-600';
            case 'delivered':
                return 'bg-green-500 dark:bg-green-600';
            case 'refused':
                return 'bg-red-500 dark:bg-red-600';
            default:
                return 'bg-gray-500 dark:bg-gray-600';
        }
    };

    return (
        <>
            <div className={`w-full max-w-6xl mx-auto`}>
            <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-200`}>
                <div className={`px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center`}>
                    <h2 className={`text-xl font-semibold text-gray-800 dark:text-gray-100`}>Restaurant deliverys</h2>
                </div>
                <div className="p-6">
                    <div className="overflow-x-aut overflow-auto" style={{ maxHeight: '400px' }}>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className={`bg-gray-50 dark:bg-gray-700`}>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Items</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Status</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>created Time</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Delivred at</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Validate order</th>
                                    <th className={`px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>Refuse order</th>

                                </tr>
                            </thead>
                            <tbody className={`bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700`}>
                                {deliverys.length === 0 &&
                                    <div className='w-full flex justify-center p-4'>
                                        <span>There is no Commands right now</span>
                                    </div>
                                }
                                {deliverys.map((Command) => (
                                    <tr key={Command._id}>
                                        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300`}>
                                            <ul className="list-disc list-inside">
                                                {Command.orderId.items.map((item, index) => (
                                                    <li key={index}>
                                                        {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusColor(Command.status)}`}>
                                                {Command.status}
                                            </span>
                                        </td>
                                        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300`}>
                                            {new Date(Command.createdAt).toLocaleString()}
                                        </td>
                                        <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300`}>
                                            {Command.deliveredAt ? new Date(Command.createdAt).toLocaleString() : ''}
                                        </td>
                                        <td className={`px-4 py-2 whitespace-nowrap`}>
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                                onClick={() => handelAccepteDelivery(Command._id)}
                                                disabled={Command.status !== 'assigned' ? true: false}
                                            >
                                                Accepte Delivery
                                            </button>
                                        </td>
                                        <td className={`px-4 py-2 whitespace-nowrap`}>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => refuseDelivery(Command._id)}
                                                disabled={Command.status !== 'assigned' ? true: false}
                                            >
                                                Refuse Command
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
        </>
    );
}

export default DeliverysComponent;
