import React, { useEffect, useState } from "react";
import { axiosClient } from "../../services/AxiosClient";

interface ChooseDeliveryProps {
    orderId: string;
    closeModal: () => void;
    assignOrderToDelivery: (orderId: string, deliveryId: string) => void
}

interface Delivery {
    _id: string;
    userName: string;
    hasActiveCommand: boolean;
}

const ChooseDelivery: React.FC<ChooseDeliveryProps> = ({ orderId, closeModal, assignOrderToDelivery }) => {
    const [deliverys, setDeliverys] = useState<Delivery[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

    useEffect(() => {
        if (orderId) {
            const fetchingDeliverysUsers = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    const response = await axiosClient.get('/users/get/deliverys/users');
                    if (response.status === 200) {
                        setDeliverys(response.data.users);
                    }
                } catch (err: any) {
                    if (err.response) {
                        setError(err.response.data.error);
                    } else {
                        setError("An unexpected error occurred");
                    }
                } finally {
                    setLoading(false);
                }
            };
            fetchingDeliverysUsers();
        }
    }, [orderId]);

    const handleSelectDelivery = (deliveryId: string) => {
        setSelectedDelivery(deliveryId);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all ease-in-out duration-300 scale-100">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Select a Delivery Person</h2>
                {isLoading && (
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                )}
                {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
                <ul className="space-y-2 mb-6">
                    {deliverys.map((delivery) => (
                        <li key={delivery._id}>
                            <button
                                onClick={() => handleSelectDelivery(delivery._id)}
                                disabled={delivery.hasActiveCommand}
                                className={`w-full text-left p-3 rounded-md transition-colors duration-200 relative ${selectedDelivery === delivery._id
                                        ? 'bg-blue-500 text-white'
                                        : delivery.hasActiveCommand
                                            ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                                    }`}
                            >
                                <span className="font-medium">{delivery.userName}</span>
                                {delivery.hasActiveCommand && (
                                    <span className="absolute top-3 right-1 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full">
                                        Active Order
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => assignOrderToDelivery(orderId, selectedDelivery)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        disabled={!selectedDelivery || isLoading}
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChooseDelivery;