interface RefuseOrderComponentProps{
    orderId: string;
    cancelRefuseOrder: () => void;
    refuseOrder: (orderId: string) => void
}

const ConfirmRefuseOrder: React.FC<RefuseOrderComponentProps> = ({ cancelRefuseOrder, orderId, refuseOrder }) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Confirm Action</h2>
                </div>
                <p className="mt-2">Really you want to refuse this order?</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={cancelRefuseOrder}
                        className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => refuseOrder(orderId)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default ConfirmRefuseOrder;
