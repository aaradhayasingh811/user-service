# User Service Microservice

This **User Service** is a dedicated microservice responsible for user profile management in a microservices architecture. It provides endpoints to retrieve and update user profiles, handle avatar image uploads, and manage user logout functionality. The service uses JWT for authentication and file uploads are handled securely using `multer`.

---

## Table of Contents

- [Features](#features)  
- [API Endpoints](#api-endpoints)  
- [Authentication](#authentication)  
- [File Upload](#file-upload)  
- [Usage](#usage)  
- [Deployment](#deployment)  
- [Error Handling](#error-handling)  
- [Environment Variables](#environment-variables)  
- [Contact & Support](#contact--support)  

---

## Features

- Fetch authenticated user’s profile information  
- Update profile details including avatar upload  
- JWT token-based route protection  
- User logout endpoint to invalidate sessions  
- Designed as a scalable microservice for easy integration  

---

## API Endpoints

| Method | Endpoint       | Description                      | Auth Required | Payload/Params                       |
|--------|----------------|--------------------------------|---------------|------------------------------------|
| GET    | `/profile`     | Retrieve current user's profile | Yes           | None                               |
| PATCH  | `/profile`     | Update user profile and avatar  | Yes           | Multipart form-data: `avatar` (image), profile fields |
| POST   | `/logout`      | Logout user                    | Yes           | None                               |

---

### 1. **GET /profile**

Retrieve the profile of the authenticated user.

**Headers:**

Authorization: Bearer <jwt_token>


**Response:**

```json
{
  "id": "12345",
  "name": "John Doe",
  "email": "john@example.com",
  "avatarUrl": "/uploads/1685049600000-avatar.png",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-05-01T15:30:00Z"
}

```


### 2. PATCH /profile

#### Update user profile details and optionally upload a new avatar image.

* Headers:
* Authorization: Bearer <jwt_token>
* Content-Type: multipart/form-data
* Body:
* Profile fields to update (e.g., name, email)
* avatar — image file for profile picture (optional, max size 5MB)


### 3. POST /logout

#### Logs out the authenticated user by invalidating their token/session.

```bash
Headers:
Authorization: Bearer <jwt_token>
Response:
{ "message": "Successfully logged out." }

```

#### Authentication

* This service protects all sensitive routes with JWT tokens verified by the verifyToken middleware. Tokens must be included in the Authorization header.

#### File Upload

* Uses multer middleware for handling avatar uploads

* Stores files in the uploads/ directory

* Accepts image files only (validated by MIME type)

* Maximum file size limit of 5 MB

* Filenames are prepended with a timestamp for uniqueness

### Usage

``` bash
Clone the repository

Install dependencies:
npm install
Configure environment variables (e.g., JWT secret, upload path)

Start the service locally:
npm run start

```

### Deployment

- This microservice can be deployed using:

#### Docker: Containerized for easy deployment and scalability. Use the provided Dockerfile to build and run the container.

#### Render: Ready for deployment on Render.com for managed cloud hosting with CI/CD integration.

#### Error Handling

* Unauthorized access returns 401 Unauthorized

* Invalid file uploads return descriptive error messages

* Input validation errors return 400 Bad Request

### Environment Variables

```bash
JWT_SECRET - Secret key to sign and verify JWT tokens

UPLOAD_DIR - Directory path to store uploaded avatar images (default: uploads/)

Other service-specific configuration
```

### Contact & Support
- For issues or feature requests, please open an issue on the repository or contact the maintainer.

- This service is designed to be a robust part of a larger microservices ecosystem, easily integrated and deployed with modern cloud and container technologies.

## Docker Setup

-This service is containerized with Docker for easy deployment.

### Dockerfile

```dockerfile
# Use official Node.js LTS image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the application code
COPY . .

# Create uploads directory and set permissions
RUN mkdir -p uploads && chmod -R 755 uploads

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]## Docker Setup

```

This service is containerized with Docker for easy deployment.

### Dockerfile

```dockerfile
# Use official Node.js LTS image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the application code
COPY . .

# Create uploads directory and set permissions
RUN mkdir -p uploads && chmod -R 755 uploads

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]

```

# Build Docker image
docker build -t user-service .

# Run Docker container
docker run -d -p 3000:3000 \
  -e JWT_SECRET=your_jwt_secret_here \
  -v $(pwd)/uploads:/app/uploads \
  --name user-service-container user-service

