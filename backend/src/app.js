import express from "express";
import compression from "compression";
import helmet from "helmet";
import xss from "xss-clean";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import "dotenv/config";

import { connectToDB, syncModels } from "./database/db.js";
import { apiLimiter, errorHandler } from "./middlewares/index.js";
import AppRouter from "./routes/index.js";

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};

// Connect to the database
connectToDB();

// Sync models (in production)
if (process.env.NODE_ENV === "production") {
    syncModels();
}
const app = express(); // Create a new Express application
const appRouter = new AppRouter(app);

// Middleware configuration
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(xss());

// Rate limiting middleware for API routes (in production)
if (process.env.NODE_ENV === "production") {
    app.use("/api", apiLimiter);
}

// Set the port for the application
app.set("port", process.env.PORT || 8080);

// Enable Cross-Origin Resource Sharing with specified options
app.use(cors(corsOptions));

// Body parser configuration
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "1000mb" }));

// Global error handler middleware
app.use(errorHandler);

// Serve static files for product images and category images
app.use("/product-images", express.static(`${path.resolve()}/assets/images/products`));
app.use("/category-image", express.static(`${path.resolve()}/assets/images/categories`));

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});

// Initialize the application router
appRouter.init();

export default app;
