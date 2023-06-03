# Users API Backend

This is a Node.js Express.js application that serves as the backend for a users API. It uses MongoDB as the database and is implemented with TypeScript.

## Prerequisites

Make sure you have the following software installed on your system:

- Node.js (v18.14.0 or later)
- npm (Node Package Manager)

## Installation

To install the project dependencies, run the following command in the project directory:

```bash
npm install
```

## Configuration

Create a `.env` file in the project root directory and provide the following configuration:

```plaintext
SECRET_KEY="userssecretkey123"
MONGO_URL="mongodb://localhost:27017"
MONGO_DB="usersdb"
PORT=8000
```

- `SECRET_KEY`: A secret key used for JWT token generation.
- `MONGO_URL`: The URL for your MongoDB database.
- `MONGO_DB`: The name of the MongoDB database.
- `PORT`: The port on which the server will listen (default: 8000).

## Running the Server

To start the server, run the following command:

```bash
npm run dev
```

The server will start running on the specified port (or default port 8000). You can access the API at `http://localhost:8000`.

## API Endpoints

The following API endpoints are available:

- `POST /auth/login`: Authenticate a user and generate a JWT token.
- `GET /auth/session`: Verify a JWT token and retrieve user information.
- `GET /users`: Get all users.
- `GET /users/:id`: Get a user by ID.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update a user by ID.
- `DELETE /users/:id`: Delete a user by ID.

Refer to the individual controllers and models for more details on each endpoint's functionality.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- TypeScript

## Contributing

Contributions are welcome! If you find any issues or want to enhance the project, feel free to open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
