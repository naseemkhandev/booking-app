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
    next(handleError(error.message));
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (req.params.id) return next(handleError(404, "Hotel not found!"));

    res
      .status(200)
      .json({ message: "Hotel Updated Successfully!", hotel: hotel });
  } catch (error) {
    next(handleError(error.message));
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Hotel has been Deleted Successfully!" });
  } catch (error) {
    next(handleError(error.message));
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res
      .status(200)
      .json({ message: "Single Hotel Fetched Successfully!", hotel: hotel });
  } catch (error) {
    next(handleError(error.message));
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();

    res
      .status(200)
      .json({ message: "All Hotels Fetched Successfully!", hotels: hotels });
  } catch (error) {
    next(handleError(error.message));
  }
};
