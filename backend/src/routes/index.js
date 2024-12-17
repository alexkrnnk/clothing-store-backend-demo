import userRouter from "./api/user.router.js";
import reviewRouter from "./api/review.router.js";
import productRouter from "./api/product.router.js";
import categoryRouter from "./api/category.router.js";
import docsRouter from "./api/docs.router.js";
import authRouter from "./api/auth.router.js";
import orderRouter from "./api/order.router.js";
/**
 * Class representing the main application router.
 */
class AppRouter {
    /**
     * Create an instance of AppRouter.
     * @param {Object} app - The Express application object.
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Initialize the routes for the application.
     */
    init() {
        // Default route
        this.app.get("/", (_req, res) => {
            res.send("API Running");
        });

        // Authentication routes
        this.app.use("/api/auth", authRouter);

        // Documentation routes
        this.app.use("/api/docs", docsRouter);

        // User routes
        this.app.use("/api/users", userRouter);

        // Review routes
        this.app.use("/api/reviews", reviewRouter);

        // Product routes
        this.app.use("/api/products", productRouter);

        // Category routes
        this.app.use("/api/categories", categoryRouter);

        // Order routes
        this.app.use("/api/orders", orderRouter);
    }
}

export default AppRouter;
