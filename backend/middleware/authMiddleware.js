import { log } from "console";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

export let user;
export const verifyToken = (req, res, next) => {
    let token;
    let  authHeader =  req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401)
            .json({message: "There is no token, authorization denied"})
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log(token);
            
            user = req.user;
            next()
            
        } catch (err) {
            res.status(400)
            .json({message: "Token is not valid. "})
        }
    }
}

export const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; 
      if (!userRole) {
        return res.status(403).json({ message: "Role not defined." });
      }
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied. You do not have permission to access this resource." });
      }
  
      next();
    };
  };


  export const adminUser = {
    username: 'admin',
    password: '$2b$10$DwxoZnpLpjjp5kJ1dO2W2O2inUyYbPKUUJb2zIcS9Vne5o/sAOKxO', 
    role: 'admin',
  };
  
  //admin user
  export const createAdminUser = async () => {
    const hashedPassword = await hash('admin123', 10); 
    adminUser.password = hashedPassword; 
    }