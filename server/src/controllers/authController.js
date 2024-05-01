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

    const { password: userPassword, isAdmin, ...userInfo } = newUser._doc;

    res
      .status(201)
      .json({ message: "User Created Successfully!", user: userInfo });
  } catch (error) {
    return next(error.message);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(handleError(404, "User not found!"));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return next(handleError(400, "Wrong Credentials!"));

    const { password: userPassword, isAdmin, ...userInfo } = user._doc;
    res.status(200).json({ message: "Login Successful!", user: userInfo });
  } catch (error) {
    next(error);
  }
};
