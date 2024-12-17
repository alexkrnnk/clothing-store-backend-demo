# Sport Styles

Welcome to the repository of the Sport Styles project! This is a backend web application dedicated to a sportswear and accessories store. The basis of the project is `backend` (server on Node.js + Express).

## Features

- **Node.js Backend**: Robust server-side handling with Express framework.
- **JWT Authentication**: Secure login and authentication for users.
- **MySQL Database**: Reliable database management for storing user and product data.

## Prerequisites

Before you begin, ensure you have installed the following on your system:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://npmjs.com/) (usually comes with Node.js)
- MySQL Server (for the database)

## Installation

To get this project running locally, follow these steps:

### Clone the repository

```bash
git clone https://github.com/alexkrnnk/node-backend-clothes-shop
cd backend
```

### Install dependencies

You need to install dependencies for backend.

```bash
# Install backend dependencies
cd backend
npm install
cd ..
```

### Configure the environment

Create `.env` file in the`backend` directory to store your environment-specific configurations like database credentials, API keys, etc. Each directory contains a sample `.env` file to guide you:

- **Backend**: You'll find an example `.env` file named `.env.example` in the `backend` directory. Copy this file and adjust the values as needed.
  
```bash
cp backend/.env.example backend/.env
```

By setting up these .env files, you ensure that your application can access necessary environment variables while keeping sensitive information out of version control.

## Running the Backend

You can run the backend server in development mode using:

```bash
npm run dev
```

This command starts the Node.js server with tools like nodemon for live-reloading during development.

For production environments, use the following command to start the server:

```bash
npm start
```

## Usage

The backend services will be available at http://localhost:8080 by default. Make sure your .env file is correctly configured to connect to any required databases or external services.

## Contributing

This is a private project developed and commissioned as a bespoke solution. We do not accept any contributions, and unauthorized use, distribution, or modification of this project is strictly prohibited.

## License

Distributed under the Apache-2.0 License. See LICENSE for more information.

This project and all associated source code and files are owned by BP Jam. Unauthorized copying, modification, distribution, or use of this software, regardless of the medium, without express and written permission from us is strictly prohibited.

All rights to the source code, documentation, and related materials are reserved by BP Jam. For further inquiries regarding licensing or obtaining a copy, please contact us directly.

## Contact

For any inquiries, licensing questions, or other concerns, please contact us at:

- Email: [kornienkosasha2003@gmail.com](mailto:your-email@example.com)
- Project Link: [clothes-shop](https://github.com/alexkrnnk/node-backend-clothes-shop)

## Acknowledgements
- [Node.js](https://nodejs.org)
- [MySQL](https://www.mysql.com)
- [JWT](https://jwt.io)
- [Express](https://expressjs.com)
