import jwt from "jsonwebtoken";
import Account from "../models/accounts.js";

const middlewareController = {
  // verifyToken:xác thực token
  verifyToken: (req, res, next) => {
    // const token  = req.headers.token;
    // const
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      const accessToken = token;
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (!user) {
          return res.status(403).json("Token is not valid");
        }
        const authenticate = Account.findOne({ id: user.id });
        console.log(authHeader);
        if (authenticate) {
          // req.user = user;
          return next();
        }
      });
    } else {
      return res.status(401).json("you're not authenticated");
    }
  },
};

export default middlewareController;
