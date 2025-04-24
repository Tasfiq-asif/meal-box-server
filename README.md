# MealBox Server

Backend server for MealBox - Personalized Meal Planning & Delivery application.

## Tech Stack

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## Project Structure

```
src/
├── app/              # Application modules
│   ├── config/       # Configuration files
│   └── modules/      # Feature modules
│       ├── auth/     # Authentication module
│       │   ├── controller/ # Controllers
│       │   ├── route/      # Routes
│       │   ├── service/    # Business logic
│       │   └── validation/ # Input validation
│       └── user/     # User module
│           ├── controller/ # Controllers
│           ├── interface/  # Type definitions
│           ├── model/      # MongoDB schemas
│           ├── route/      # Routes
│           ├── service/    # Business logic
│           └── validation/ # Input validation
├── middleware/       # Middleware functions
├── utils/            # Utility functions
├── app.ts            # Express app setup
└── server.ts         # Server entry point
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory (see `.env.example` for reference)
4. Run the server in development mode:
   ```
   npm run dev
   ```
5. For production:
   ```
   npm run build
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/logout` - Logout user

### User Profile

- `GET /api/v1/users/me` - Get current user profile
- `PATCH /api/v1/users/me` - Update user profile

### Admin Routes

- `GET /api/v1/users` - Get all users (admin only)
- `GET /api/v1/users/:id` - Get user by ID (admin only)
- `DELETE /api/v1/users/:id` - Delete user (admin only)

### Meals

- `GET /api/v1/meals` - Get all available meals
- `GET /api/v1/meals/user/:userId` - Get meals for a specific provider
- `POST /api/v1/meals` - Create a new meal
- `POST /api/v1/meals/with-image` - Create a new meal with an image upload
- `PUT /api/v1/meals/:mealId` - Update a meal
- `PUT /api/v1/meals/:mealId/with-image` - Update a meal with an image upload
- `DELETE /api/v1/meals/:mealId` - Delete a meal

## API Response Format

### Success Response

```json
{
  "status": true,
  "statusCode": 200,
  "message": "Success message",
  "data": { ... } // Response data
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "errorMessages": [
    {
      "path": "field_name",
      "message": "Error details"
    }
  ]
}
```

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRES_IN` - JWT token expiry (e.g. '30d' for 30 days)
- `COOKIE_EXPIRES_IN` - Cookie expiry in days
- `BCRYPT_SALT_ROUNDS` - Number of salt rounds for password hashing
- `FRONTEND_URL` - Frontend application URL
- `JWT_REFRESH_SECRET` - Secret key for refresh token signing
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiry (e.g. '7d' for 7 days)
- `IMGBB_API_KEY` - ImgBB API key

## Image Upload

The application uses ImgBB to store meal images. When creating or updating a meal with an image:

1. Use the `/with-image` endpoints
2. Send a multipart form request with:
   - `image`: The image file
   - `mealData`: A JSON string containing the meal details

Example:

```javascript
const formData = new FormData();
formData.append("image", imageFile);
formData.append("mealData", JSON.stringify(mealData));

axios.post("http://localhost:8000/api/v1/meals/with-image", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});
```
