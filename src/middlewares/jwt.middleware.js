import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const JwtMiddleware = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || "r@nd0mS3cr3tK3y!";

  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from Authorization header

  if (!token) {
    return res.status(401).json({message: "Unauthorized - Token missing"});
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    if(decoded.exp < Date.now() / 1000){
        return res.status(401).json({message: "Unauthorized - Token expired"});
    }
    if('id' in decoded){
        const user = UserModel.getUserById(decoded.id);
        if(!user){
            return res.status(401).json({message: "Unauthorized - User not found"});
        }
        req.user = user; // Attach decoded payload to request
    }
    /*
    ASK: If am using this code without else statement it was returning multiple status codes
    causing error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
    */
    else{
      return res.status(401).json({message: "Unauthorized - User not found"});
    }
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({message: "Unauthorized - Invalid token"});
  }
};

export default JwtMiddleware
