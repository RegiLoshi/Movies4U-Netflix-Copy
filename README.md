# Movies4U

Movies4U is a web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a platform for users to browse, like, and manage their favorite movies or shows.

## Technologies Used

### Frontend
- React
- Redux (with @reduxjs/toolkit)
- React Router
- Axios for API calls
- Formik & Yup for form handling and validation
- Lucide React for icons
- SweetAlert2 for notifications
- TailwindCSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) for authentication
- Bcrypt.js for password hashing
- Cors for handling Cross-Origin Resource Sharing

## Setup and Installation

### Prerequisites
- Node.js (v14 or later recommended)
- MongoDB

### Frontend Setup
1. Navigate to the project directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root of the backend directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```
   npm run server
   ```

## Features
- User authentication (signup, login, logout)
- Browse movies/shows
- Like/unlike movies/shows
- View user profile
- (Add any other features specific to your application)

## Testing
- Frontend: (Add instructions if you have frontend tests)
- Backend: Run tests using Jest
  ```
  npm test
  ```

## License
This project is licensed under the ISC License.


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Demo
https://private-user-images.githubusercontent.com/133386457/371775462-d923e01b-47a8-41c3-b69c-6d1d0bed6d54.mov?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjc1Mzk5MzYsIm5iZiI6MTcyNzUzOTYzNiwicGF0aCI6Ii8xMzMzODY0NTcvMzcxNzc1NDYyLWQ5MjNlMDFiLTQ3YTgtNDFjMy1iNjljLTZkMWQwYmVkNmQ1NC5tb3Y_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwOTI4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDkyOFQxNjA3MTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mYTNmMWE4YWIxMWZiYTk4ODgyYTYwM2Q2NTgyMTI0ZmNmNmU4NDdlZmRkN2QwYmM5NzgzMjdhMTUwMGE5ZTBmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.eOqWQifb8slWXUH5HvWgGl-wa6kNrQT44U_oGzvzOY0
