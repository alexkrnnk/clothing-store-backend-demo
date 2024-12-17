# Sport Styles

Welcome to the Sport Styles project repository! This is a web application dedicated to a clothes shop for sporting apparel and accessories. The project is structured into two main directories: `frontend` (a React application) and `backend` (a Node.js + Express server).

## Features

- **React Frontend**: Modern and responsive UI for showcasing sports clothing and accessories.
- **Node.js Backend**: Robust server-side handling with Express framework.
- **JWT Authentication**: Secure login and authentication for users.
- **SEO Ready**: SEO optimizations for better search engine rankings.
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
git clone https://github.com/BPJam/clothes-shop.git
cd clothes-shop
```

### Install dependencies

You need to install dependencies for both the frontend and backend.

```bash
# Install frontend dependencies
cd frontend
npm install
cd ..
```

```bash
# Install backend dependencies
cd backend
npm install
cd ..
```

### Configure the environment

Create `.env` files in the `frontend` and `backend` directories to store your environment-specific configurations like database credentials, API keys, etc. Each directory contains a sample `.env` file to guide you:

- **Backend**: You'll find an example `.env` file named `.env.example` in the `backend` directory. Copy this file and adjust the values as needed.
  
```bash
cp backend/.env.example backend/.env
```

- **Frontend**: There is a sample .env file in the frontend directory called .sample.env. Copy this file and modify the contents to fit your environment settings.

```bash
cp frontend/.sample.env frontend/.env
```

By setting up these .env files, you ensure that your application can access necessary environment variables while keeping sensitive information out of version control.

## Running the application

You can run the entire stack (frontend and backend) using:

```bash
npm run dev
```

This uses concurrently to launch both the React application and Node.js server in development mode.

For production environments, you should build the frontend and start only the backend server:

```bash
npm start
```

## Usage

The frontend React app can be accessed at http://localhost:3000 by default, and the backend services will be available at http://localhost:8080.

## Contributing

This is a private project developed and commissioned as a bespoke solution. We do not accept any contributions, and unauthorized use, distribution, or modification of this project is strictly prohibited.

## License

Distributed under the Apache-2.0 License. See LICENSE for more information.

This project and all associated source code and files are owned by BP Jam. Unauthorized copying, modification, distribution, or use of this software, regardless of the medium, without express and written permission from us is strictly prohibited.

All rights to the source code, documentation, and related materials are reserved by BP Jam. For further inquiries regarding licensing or obtaining a copy, please contact us directly.

## Contact

For any inquiries, licensing questions, or other concerns, please contact us at:

- Email: [office@bp-jam.com](mailto:your-email@example.com)
- Project Link: [clothes-shop](https://github.com/BPJam/clothes-shop)
- Production Link: [clothes-shop-lime.vercel.app/](https://clothes-shop-lime.vercel.app/)

## Acknowledgements
- [Node.js](https://nodejs.org)
- [React](https://react.dev)
- [MySQL](https://www.mysql.com)
- [JWT](https://jwt.io)
- [Express](https://expressjs.com)
