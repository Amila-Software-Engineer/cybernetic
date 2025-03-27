
import prisma from "../prisma/prismaClient.js";
import {user} from "../middleware/authMiddleware.js";

export const createCourse = async (
    req,res
  ) => {
    try {

      const { title, description } = req.body;
  
      if (!title) {
        return res.status(400).json({ message: "Title is required." });
      }
      const newCourse = await prisma.course.create({
        data: {
          title,
          description, 
        },
      });
  
      res.status(201).json({
        message: "Course created successfully.",
        course: newCourse,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };
  
  export const viewCourses = async (
    req,res
  ) => {
   
    try {
    
      const courses = await prisma.course.findMany({
        include: {
          enrollments: true, 
        },
      });
  
      if (courses.length === 0) {
        return res.status(404).json({ message: "No courses found." });
      }
  
      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };


export const enrollStudent = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    // if(token.role)
    console.log('what is this ',user);
    
   
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: "User is already enrolled in this course." });
    }

    const newEnrollment = await prisma.enrollment.create({
      data: {
        userId: userId,
        courseId: courseId,
      },
    });

    res.status(201).json({
      message: "Enrollment successful.",
      enrollment: newEnrollment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
