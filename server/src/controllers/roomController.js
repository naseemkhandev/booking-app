import { Room } from "../schema/roomModal.js";
import { Hotel } from "../schema/hotelModal.js";

export const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const newRoom = await Room.create(req.body);

    try {
      await Room.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });
    } catch (error) {
      next(error.message);
    }

    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    next(error.message);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "room Updated Successfully!", room: updatedRoom });
  } catch (error) {
    next(error.message);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(
      hotelId,
      { $pull: { rooms: req.params.id } },
      { new: true }
    );

    res.status(200).json({ message: "Room has been Deleted Successfully!" });
  } catch (error) {
    next(error.message);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    res
      .status(200)
      .json({ message: "Single room Fetched Successfully!", room: room });
  } catch (error) {
    next(error.message);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    res
      .status(200)
      .json({ message: "All Rooms Fetched Successfully!", rooms: rooms });
  } catch (error) {
    next(error.message);
  }
};
