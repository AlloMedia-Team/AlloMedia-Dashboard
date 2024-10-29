import { getDeliverysMan } from "../../repositorys/userRepository.js"
import userModel from "../../models/userModel.js";

export const getAllDeliverysMan = async (req, res) => {
    try {
        const users = await getDeliverysMan();
        return res.status(200).json({
            users: users
        })
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                error: err.message
            })
        }
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel
            .find()
            .populate("roleId", "name permissions")
            .select(
                "-password -resetToken -resetTokenExpiration -otp -OTPExpiration"
            );
        res.status(200).json({
            data: users,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};