import { getDeliverysMan } from "../../repositorys/userRepository.js"

export const getAllDeliverysMan = async (req, res) => {
    try{
        const users = await getDeliverysMan();
        return res.status(200).json({
            users: users
        }) 
    }catch(err){
        if(err.status){
            return res.status(err.status).json({
                error: err.message
            })
        }
        return res.status(500).json({
            error: "server error"
        })
    }
}