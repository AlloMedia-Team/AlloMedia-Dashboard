import Role from "../models/roleModel.js";
import User from "../models/userModel.js";

export const getDeliverysMan = async () => {
    try {
        const deliveryRole = await Role.findOne({ name: 'delivery' });

        if (!deliveryRole) {
            const error = new Error('No role founded');
            error.status = 404;
            throw error;
        }
        // const deliveryUsers = await User.find({ roleId: deliveryRole._id }).populate('roleId');
        const deliveryUsers = await User.aggregate([
            {
                // Match users with the 'delivery' role
                $match: { roleId: deliveryRole._id }
            },
            {
                // Lookup deliveries to check for active commands
                $lookup: {
                    from: "deliveries", // Name of the Delivery collection
                    localField: "_id",
                    foreignField: "deliveryAgentId",
                    as: "deliveries"
                }
            },
            {
                // Add a new field indicating if there are active commands
                $addFields: {
                    hasActiveCommand: {
                        $gt: [
                            {
                                $size: {
                                    $filter: {
                                        input: "$deliveries",
                                        as: "delivery",
                                        cond: { $ne: ["$$delivery.status", "delivered"] }
                                    }
                                }
                            },
                            0
                        ]
                    }
                }
            },
            {
                // Optionally limit the fields returned
                $project: {
                    _id: 1,
                    userName: 1,
                    hasActiveCommand: 1
                }
            }
        ]);
        return deliveryUsers;
    } catch (error) {
        throw error;
    }
}