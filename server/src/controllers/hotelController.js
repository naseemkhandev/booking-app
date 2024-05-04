import handleError from "../middlewares/handleError.js";
import { Hotel } from "../schema/hotelModal.js";

export const createHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);
    const newHotel = await hotel.save();

    res
      .status(201)
      .json({ message: "Hotel Created Successfully!", hotel: newHotel });
  } catch (error) {
    next(error.message);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Hotel Updated Successfully!", hotel: hotel });
  } catch (error) {
    next(error.message);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Hotel has been Deleted Successfully!" });
  } catch (error) {
    next(error.message);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res
      .status(200)
      .json({ message: "Single Hotel Fetched Successfully!", hotel: hotel });
  } catch (error) {
    next(error.message);
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const { min, max, limit, ...others } = req.query;
    console.log("Received query parameters: ", req.query);

    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 999 },
    }).limit(limit);

    res
      .status(200)
      .json({ message: "All Hotels Fetched Successfully!", hotels: hotels });
  } catch (error) {
    next(error.message);
  }
};

export const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");

    const list = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city: city }))
    );

    res
      .status(200)
      .json({ message: "Cities Count Fetched Successfully!", cities: list });
  } catch (error) {
    next(error.message);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const cabinsCount = await Hotel.countDocuments({ type: "cabins" });
    const villasCount = await Hotel.countDocuments({ type: "villas" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });

    res.status(200).json({
      message: "Type Count Fetched Successfully!",
      types: [
        { type: "hotel", count: hotelCount },
        { type: "cabins", count: cabinsCount },
        { type: "villas", count: villasCount },
        { type: "resort", count: resortCount },
        { type: "apartment", count: apartmentCount },
      ],
    });
  } catch (error) {
    next(error.message);
  }
};
