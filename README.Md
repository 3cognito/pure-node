# Pure Node.js Web Server

This project is a simple web server implemented using pure Node.js without any external frameworks. It provides a basic structure to handle HTTP requests, define routes, and perform CRUD operations on a collection of books. I did this to test my fundamental understanding of OOP, Nodejs and My ability to develop a web server without a framework and even understand what an unopinionated framework like expressjs does under the hood.

## Features

- HTTP server implementation using Node.js `http` module
- Routing system to handle different HTTP methods and URLs
- Middleware support for request processing
- Basic CRUD operations for managing a collection of books
- Error handling for handling and displaying appropriate error messages

## Installation

1. Clone the repository

2. Install dependencies:

   ```
   npm install
   ```

3. Start the server:

```
npm run dev
```

You can test the routes using an API testing tool like Postman or curl.

## Project Structure

- `src/` - Contains the source code of the web server
  - `controllers/` - Defines the controllers for handling different routes
  - `models/` - Contains the data models used in the application
  - `database/` - Contains database connection and model definition
  - `services/` - Contains business logic
  - `core.ts` - Main server file with initialization logic
- `dist/` - Contains the compiled JavaScript code

- Note, I did not add all the routes, if you care to do so for whatever reason, you can modify it as you see fit!
