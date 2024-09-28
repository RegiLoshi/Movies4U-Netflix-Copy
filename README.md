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

