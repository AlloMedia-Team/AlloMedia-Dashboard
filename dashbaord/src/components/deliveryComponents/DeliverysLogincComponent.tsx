import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../services/AxiosClient";
import DeliverysComponent from "./DeliverysComponent";
import ConfirmRefuseDelivery from "./ConfirmRefuseDelivery";

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
const DeliverysLogincComponent: React.FC = () => {
    const [deliverys, setDeliverys] = useState<Delivery[]>([]);
    const [isRefuseModalOpen, setRefuseDelivery] = useState<string | null>(null);

    const fetchingDeliverys = async () => {
        try{
            const response = await axiosClient.get('/delivery/get/deliverys');            
            if(response.status === 200){
                setDeliverys(response.data.commands);
            }
        }catch (err:any){
            if(err.response){
                toast.error(err.response.data.error);
            }else{
                toast.error("server error");
            }
        }
    }

    const handelAccepteDelivery = async (deliveryId: string) => {
        try{
            const response = await axiosClient.put('/delivery/validat/delivery', {
                deliveryId
            })
            if(response.status === 200){
                toast.success(response.data.message);
                fetchingDeliverys();
            }
        }catch(err:any){
            if(err.response){
                console.log(err)
                toast.error(err.response.data.error);
            }else{
                toast.error("server error");
            }
        }
    }

    useEffect(() => {
        fetchingDeliverys();
    }, []);
    return (
        <>
            <DeliverysComponent
            deliverys={deliverys}
            refuseDelivery={(value:string) => setRefuseDelivery(value)}
            handelAccepteDelivery={handelAccepteDelivery}
            />
            {isRefuseModalOpen && 
            <ConfirmRefuseDelivery
            deliveryId={isRefuseModalOpen}
            closeRefuseModal={() => setRefuseDelivery(null)}
            />
            }
        </>
    );
}

export default DeliverysLogincComponent;
