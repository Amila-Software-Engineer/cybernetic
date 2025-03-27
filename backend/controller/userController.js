
import prisma from "../prisma/prismaClient.js";
import {user} from "../middleware/authMiddleware.js";


  export const allStudents = async (
    req,res
  ) => {
   
    try {
    
      const students = await prisma.user.findMany({
        where: {
            role :'student'
          },
      });
  
      if (students.length === 0) {
        return res.status(404).json({ message: "No Student found." });
      }
  
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };
