import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.HOST  || 'localhost',
    user: process.env.USER  || 'amila',
    password: process.env.PASSWORD  || 'your_password',
    database: process.env.DATABASE  || 'cybernetic'
  });
  

  const dbConnect = () => {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err.stack);
        process.exit(1); // Exit the process with a failure code
      }
      console.log('Connected to the database as ID', connection.threadId);
    });
  };

  export { dbConnect, connection };