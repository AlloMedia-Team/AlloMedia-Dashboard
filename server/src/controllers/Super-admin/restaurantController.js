import Restaurant from "../../models/restaurantModel.js";

const getAllRestaurants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery = {};
    if (req.query.name) {
      searchQuery.name = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.city) {
      searchQuery["location.city"] = { $regex: req.query.city, $options: "i" };
    }
    if (req.query.address) {
      searchQuery["location.address"] = {
        $regex: req.query.address,
        $options: "i",
      };
    }

    // Handle manager name search
    let restaurantQuery = Restaurant.find(searchQuery);
    if (req.query.managerName) {
      restaurantQuery = restaurantQuery.populate({
        path: "managerId",
        match: {
          $or: [
            { firstName: { $regex: req.query.managerName, $options: "i" } },
            { lastName: { $regex: req.query.managerName, $options: "i" } },
          ],
        },
      });
    } else {
      restaurantQuery = restaurantQuery.populate(
        "managerId",
        "firstName lastName email"
      );
    }

    const totalRestaurants = await Restaurant.countDocuments(searchQuery);

    let restaurants = await restaurantQuery.skip(skip).limit(limit);

    // Filter out null managerId results if manager name search was performed
    if (req.query.managerName) {
      restaurants = restaurants.filter((restaurant) => restaurant.managerId);
    }

    res.status(200).json({
      data: restaurants,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRestaurants / limit),
        totalItems: totalRestaurants,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRestaurant = async (req, res) => {
  const newRestaurant = new Restaurant(req.body);
  console.log(req.body);

  try {
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRestaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchingPendingRestaurant = async (req, res)=>{
  try{
    let notacceptedRestaurant = await Restaurant.aggregate([
      {
        $match: {
          isAccepted: false
        }
      },{
        $lookup:{
          from: "users",
          localField: 'managerId',
          foreignField: '_id',
          as: "owner"
        }
      }
    ]);
    console.log('nooot accepted', notacceptedRestaurant)
      return res.json({notacceptedRestaurant});
  }catch(e){
    console.log('an error here',e)
      return res.json({message:'well another error'});
  }
}

const acceptingRestaurant = async (req, res)=>{
  try{
    const {id} = req.params;
    const isAccepted = true;
    console.log(req.params);

    let updaterestaurant = await Restaurant.updateOne({_id : id},{ $set :{isAccepted}});
    console.log(updaterestaurant);
    if(updaterestaurant){
      return res.status(200).json({message: "the restaurant is accepted"});
    }
    return res.status.json({message:"failed the restaurant is not accepted"});
  }catch(e){
    return res.json({message:'an error has happend'});
  }

}



export {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  fetchingPendingRestaurant,
  acceptingRestaurant
};
