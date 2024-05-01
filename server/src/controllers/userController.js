import handleError from "../middlewares/handleError.js";
import { User } from "../schema/userModal.js";

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ message: "User Updated Successfully!" });
  } catch (error) {
    next(error.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User has been Deleted Successfully!" });
  } catch (error) {
    next(error.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, isAdmin, ...userInfo } = user._doc;

    res
      .status(200)
      .json({ message: "Single User Fetched Successfully!", user: userInfo });
  } catch (error) {
    next(error.message);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -isAdmin");

    res
      .status(200)
      .json({ message: "All users Fetched Successfully!", users: users });
  } catch (error) {
    next(error.message);
  }
};
