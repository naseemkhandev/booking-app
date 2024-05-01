import verifyToken from "./VerifyToken.js";
import handleError from "./handleError.js";

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(handleError(403, "You are not authorized!"));
    }
  });
};

export default verifyAdmin;
