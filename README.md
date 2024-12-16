# Coupon Management System

This project is a simple Coupon Management System with a frontend and backend implemented using React.js, Node.js and SQLite.

## Project Structure

The project is divided into two main folders:

1. **Backend**: Contains the server-side logic and database handling using Node.js and SQLite.
2. **Frontend**: A React-based application for managing coupons, where users can view, add, and edit coupons.

## Technologies Used

- **Backend**:
  - Node.js
  - SQLite (no external database needed)
  - Express.js for API routes

- **Frontend**:
  - React.js
  - Ant Design for UI components

## Backend Setup

### Prerequisites
Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (or yarn)

### Steps to Run the Backend

1. Navigate to the `backend` folder.
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the backend server:

  ```bash
    npm start
  ```
  The server will start on http://localhost:5000.

### API Endpoints
- GET /coupons - Fetches all coupons
- POST /coupons - Creates a new coupon
- PUT /coupons/:id - Updates an existing coupon
- DELETE /coupons/:id - Deletes a coupon

## Frontend Setup

### Steps to Run the Frontend
1. Navigate to the frontend folder.
2. Install dependencies:

  ```bash
    npm install
  ```
3. Run the frontend application:

  ```bash
    npm start
  ```
  The application will be available at http://localhost:3000.

## How to Use
- Admin Panel:
  ![image](https://github.com/user-attachments/assets/a2f81675-1844-4b9f-8840-46d7a09e9c1c)
  - You can add, edit, and delete coupons using the Admin Panel.
  - Coupons are managed with details like Code, Description, Discount Type, and Discount Value.
- Checkout Cart:
  ![image](https://github.com/user-attachments/assets/19f7d888-e971-4662-8177-c8a39b6fcc12)
  - A user can apply a valid coupon in the checkout cart to receive a discount on their order.
 
## License
This project is licensed under the MIT License - see the LICENSE file for details.
