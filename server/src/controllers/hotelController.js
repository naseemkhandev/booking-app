import { Hotel } from "../schema/hotelModal.js";

export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    const newHotel = await hotel.save();

    res
      .status(201)
      .json({ message: "Hotel Created Successfully!", hotel: newHotel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHotel = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Hotel has been Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res
      .status(200)
      .json({ message: "Single Hotel Fetched Successfully!", hotel: hotel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
