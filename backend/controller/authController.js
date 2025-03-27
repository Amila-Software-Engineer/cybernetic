
import prisma from "../prisma/prismaClient.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import {adminUser} from "../middleware/authMiddleware.js";


export const register = async (
    req,res
  ) => {
    try {
      const {username , password } = req.body;
      const hashedPassword = await hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      res.status(201).json({ message: `User registered with username ${newUser.username}` });
     
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "ERROR", cause: error.message });
    }
  };
  
  export const login = async (
    req,res
  ) => {
    try {
      const {username , password } = req.body;
      if (username === adminUser.username) {
        const isMatch = await compare(password, adminUser.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials.' });
        }
  
        // Generate JWT token for admin
        const token = jwt.sign(
          { username: adminUser.username, role: adminUser.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
  
        return res.status(200).json({ token });
      }

      const user = await prisma.user.findUnique({
        where: { username },
      });
      if(!user){
        return res.status(404).json({ message: `User with username ${username} not found. `, cause: error.message });
      }   
    
      
      const isMatch = await compare(password.toString(), user.password );
      if(!isMatch){
        return res.status(400).json({ message: `Invalid Credentials. `, cause: error.message });
      }   

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({token})
    } catch (error) {
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };


