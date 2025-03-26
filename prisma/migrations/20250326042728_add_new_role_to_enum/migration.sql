-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('student', 'instructor', 'admin') NOT NULL DEFAULT 'student';
