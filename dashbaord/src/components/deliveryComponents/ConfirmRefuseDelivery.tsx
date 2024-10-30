import { useState } from "react";

interface ConfirmRefuseDeliveryProps {
    closeRefuseModal: () => void;
    deliveryId: string;
}

const ConfirmRefuseDelivery: React.FC<ConfirmRefuseDeliveryProps> = ({ closeRefuseModal, deliveryId }) => {
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>();

    const handelConfirmRefuse = () => {
        console.log('err')
        if(message === '' || !message){
            setError('message is required');
            return;
        }
    }
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Confirm Action</h2>
                    </div>
                    <p className="mt-2 mb-4">Are you sure you want to refuse this order?</p>
                    <div className="mb-4">
                        <label htmlFor="refuseReason" className="block text-sm font-medium mb-2">
                            Please explain why you're refusing this order:
                        </label>
                        <textarea
                            id="refuseReason"
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your reason here..."
                        ></textarea>
                        {error && <span className="text-red-400 dark:text-red-500">{error}</span>}
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={closeRefuseModal}
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handelConfirmRefuse}
                            className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
                            disabled={!message.trim()}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmRefuseDelivery;
