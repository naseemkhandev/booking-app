import handleError from "../middlewares/handleError.js";
import { User } from "../schema/userModal.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return next(handleError(400, "All fields are required!"));

    const user = await User.findOne({ email });
    if (user) return next(handleError(400, "User already exists!"));

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password: userPassword, ...userInfo } = newUser._doc;

    res
      .status(201)
      .json({ message: "User Created Successfully!", user: userInfo });
  } catch (error) {
    return next(error.message);
  }
};
