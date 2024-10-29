import axios from "axios";
import { useState, useEffect } from "react";
export default function PendingRestaurant() {
    const [PendingRestaurant, setPendingRestaurant] = useState({});
    useEffect(() => {
        async function fetchingPendinRestaurant() {
            try {
                let result = await axios.get('http://localhost:3000/api/restaurants/pending');
                if (result) {
                    console.log(result.data.notacceptedRestaurant);
                    setPendingRestaurant(result.data.notacceptedRestaurant);
                }
            } catch (e) {
                console.log('ops an error happend ', e);
            }

        }
        fetchingPendinRestaurant()
    }, [PendingRestaurant])

    async function handleAcceptance(id, userId) {
        try {
            let result = await axios.get(`http://localhost:3000/api/restaurants/accepted/${id}/${userId}`);
            // console.log('the result of this issss',result.data.message);
            console.log('the user update successfully');
        }catch(e){
            console.log("there's an error", e);
        }

    }

    return (
        <>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Restaurant Name</th>
                        <th>location</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Change status</th>
                    </tr>
                </thead>
                <tbody>
                    {PendingRestaurant && PendingRestaurant.length > 0 ? (
                        PendingRestaurant.map((restaurant, index) => (
                            <tr key={restaurant._id}>
                                <td>{index + 1}</td>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location.city}</td>
                                <td>{restaurant.owner[0].firstName} {restaurant.owner[0].lastName}</td>
                                <td className=" text-red-700 font-small rounded-lg text-sm">Not Accepted</td>
                                <td><button onClick={(e) => handleAcceptance(restaurant._id, restaurant.owner[0]._id)} className="btn bg-green-500" > accepter </button></td>
                            </tr>
                        ))

                    ) : (
                        <p className="font-medium text-start py-5 text-black justify-center items-center">there's no restaurant available</p>
                    )}

                </tbody>
            </table>
        </>
    )
}