# cybernetic
## LMS- Learning management system with admin panel (Backend) 

A brief description of your project, its purpose, and its main features.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

Instructions on how to install and set up the project locally.

```bash
# Clone the repository
git clone https://github.com/Amila-Software-Engineer/cybernetic

# Navigate into the project directory
cd your-repository

# Install dependencies
npm install # or your preferred package manager

# Run docker file 
docker-compose up -d # To install mysql docker image
 
 # Start the application
npm run dev # to run the project

```

## env setup
```bash
DATABASE_URL="mysql://root:root@localhost:3306/cybernetic"
PORT=5000
JWT_SECRET=your_secret

HOST=localhost
USER=your_name
PASSWORD=your_password
DATABASE=cybernetic
```

## Endpoints
these are the end points used role base authentication for secure endpoints
```bash

   # user registration
   http://localhost:5000/api/v1/auth/register

   with payload {
    username: "",
    password: ""
   }


   # user login
   http://localhost:5000/api/v1/auth/login

   with payload {
    username: "",
    password: ""
   }


```