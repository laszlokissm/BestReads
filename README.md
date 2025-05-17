# BestReads

This project was developed as a homework assignment for a Server Side JavaScript course.
It is a web application for managing and reviewing books, built with Express.js and MongoDB.

## Features

- User authentication (login/register)
- Browse books catalog
- Personal book collections with tagging (To be read, Currently reading, Finished)
- Write and read book reviews
- Rating system for books
- Admin panel for managing books and users

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB (mongoose)
- **Frontend**: EJS templates
- **Authentication**: Express session

## Project Structure

- `models/`: MongoDB schemas for Book, User, and Review
- `views/`: EJS templates for the frontend
- `middlewares/`: Express middleware functions for application logic
- `routing/`: Express routes
- `config/`: Database configuration

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Make sure MongoDB is running
   - Configure your MongoDB connection in the `config/db.js` file

3. Start the application:
   ```
   node index.js
   ```

4. Access the application at http://localhost:3000

## Note

During registration, users have the option to create either a standard user account or an administrator account.

---