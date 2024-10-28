import { useEffect, useState } from "react";
import OrdersComponent from "./OrdersComponent";
import { axiosClient } from "../../services/AxiosClient";
import toast from "react-hot-toast";
import ConfirmRefuseOrder from "./ConfirmRefuseOrder";
import ChooseDelivery from "./ChooseDelivery";

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    clientId: string; 
    restaurantId: string;
    items: OrderItem[];
    totalPrice: number;
    status: "pending" | "in_progress" | "delivered" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

const OrdersLogicComponent: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isConfirmRefuseOpen, setConfirmRefuseOpen] = useState<any>(null);
    const [isAssignModalIsOpen, setAssignModalIsOpen] = useState<any>(null);

    const fetchingOrders = async () => {
        try {
            const resposne = await axiosClient.get('/order/get/orders');
            if (resposne.status === 200) {
                setOrders(resposne.data.orders);
            }
        } catch (err: any) {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error('server error');
            }
        }
    }

    const onAssignDelivery = async (orderId: string, deliveryMan: string) => {
        try{
            const response = await axiosClient.put('/order/validate/order', {
                orderId, deliveryMan 
            });
            if(response.status === 200){
                toast.success(response.data.message);
                setAssignModalIsOpen(null);
                fetchingOrders();
            }
        }catch(err:any){
            if(err.response){
                toast.error(err.response.data.error);
            }else{
                toast.error('server error');
            }
        }
    }

    const refuseOrder = async (orderId: string) => {
        try{
            const resposne = await axiosClient.delete('/order/refuse/order', {
                data: { orderId }
            });
            if(resposne.status === 201){
                toast.success('Order refused successfully')
                setConfirmRefuseOpen(null)
                setOrders(orders.filter((order) => order._id !== orderId));
            }
        }catch(err:any){
            console.log(err);
        }
    }
    
    useEffect(() => {
        fetchingOrders();
    }, []);

    return (
        <>
            <OrdersComponent
                orders={orders}
                onAssignDelivery={(value) => setAssignModalIsOpen(value)}
                refuseOrder={(value) => setConfirmRefuseOpen(value)}
            />
            {isConfirmRefuseOpen &&
                <ConfirmRefuseOrder
                orderId={isConfirmRefuseOpen}
                cancelRefuseOrder={() => setConfirmRefuseOpen(false)} 
                refuseOrder={refuseOrder}
                />
            }
            {isAssignModalIsOpen &&
                <ChooseDelivery
                orderId={isAssignModalIsOpen} 
                closeModal={() => setAssignModalIsOpen(null)}
                assignOrderToDelivery={onAssignDelivery}
                />    
            }
        </>
    );
}

export default OrdersLogicComponent;
