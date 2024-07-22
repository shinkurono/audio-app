# Audio Management Web Application

This is a web application that allows users to upload, view, and play audio files. It features user authentication with JWT, file uploads, and user-specific file management.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Project Structure](#project-structure)
5. [API Endpoints](#api-endpoints)
6. [Contributing](#contributing)
7. [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v17 or later)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. **Clone the repository:**

Use the below command in git bash

    ```bash
    git clone https://github.com/shinkurono/audio-app.git
    cd audio-app
    ```

2. **Install backend dependencies:**

Navigate to the backend directory and install the dependencies:

    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**

Navigate to the frontend directory and install the dependencies:

    ```bash
    cd ../frontend
    npm install
    ```

4. **Set up environment variables:**

Create a .env file in the backend directory and add the following environment variables:

    ```env
    JWT_SECRET=your_jwt_secret_key
    MONGODB_URI=your_mongodb_connection_string
    ```

## Running the Application
### Using Docker

    1. Build and run the application:

    In the root of your project directory, run:

    ```bash
    docker-compose up --build
    ```

    This command builds the Docker images and starts the containers for both the backend and frontend.

    2. Access the application:

    Open your browser and go to http://localhost:3000 to access the frontend.

### Without Docker

    1. Start the backend server:

    In the backend directory, run:

    ```bash
    npm start
    ```
    The backend server will start on http://localhost:5000.

    2. Start the frontend server:

    In the frontend directory, run:

    ```bash
    npm start
    ```
    The frontend development server will start on http://localhost:3000.

## Project Structure

    backend/: Contains the backend code.
        models/: Mongoose models for MongoDB.
        routes/: Express routes for handling API requests.
        middlewares/: JWT authentication middleware.
        server.js: Entry point for the backend server.

    frontend/: Contains the frontend code.
        components/: React components for the application.
        App.js: Main React application component.
        index.js: Entry point for the React application.

    docker-compose.yml: Docker Compose configuration file.

## API Endpoints

    POST /api/auth/register: Register a new user.
    Request body:
        ```json
    {
      "username": "user",
      "password": "password"
    }
    ```

    POST /api/auth/login: Log in a user and receive a JWT token.
    Request body:
        ```json
        {
          "username": "user",
          "password": "password"
        }
    ```

    POST /api/auth/logout: Logouts loggedin user.
        Clears your cookies

    POST /api/audio/upload: Upload an audio file.
        Request headers:
            Authorization: Bearer <token>
        Form data:
            file: The audio file to upload.
            description: Description of the file.
            category: Category of the file.

    GET /api/audio/files: List all uploaded audio files for the authenticated user.
        Request headers:
            Authorization: Bearer <token>

    GET /api/playback/
    : Stream an audio file for playback.
        Request headers:
            Authorization: Bearer <token>

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.
License

This project is licensed under the MIT License. See the LICENSE file for details.
