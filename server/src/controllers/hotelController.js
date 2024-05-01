import { Hotel } from "../schema/hotelModal.js";

export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    const newHotel = await hotel.save();

    res
      .status(201)
      .json({ message: "Hotel created successfully", hotel: newHotel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
