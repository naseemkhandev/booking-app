import jwt from "jsonwebtoken";

import { config } from "../config/config.js";
import handleError from "./handleError.js";

const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
      return next(handleError(401, "You are not authenticated!"));

    jwt.verify(accessToken, config.jwtSecret, (error, user) => {
      if (error) return next(handleError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
