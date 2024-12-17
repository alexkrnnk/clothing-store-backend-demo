import https from "https";
import fs from "fs";
import app from "./app.js";
import logger from "./config/logger.js";
import { disconnectFromDB } from "./database/db.js";

const port = app.get("port");

const httpsOptions = {
    cert: fs.readFileSync('/etc/letsencrypt/live/api-sport-styles.chost.com.ua/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/api-sport-styles.chost.com.ua/privkey.pem')
};

const Server = https.createServer(httpsOptions, app);

// Server settings
const server = Server.listen(port, () => {
    try {
        console.log(`Server started on port ${port}`);
        logger.info(`Server started on port ${port}`);
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
    }
});

// Handle SIGTERM signal
process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    disconnectFromDB();
    if (server) {
        server.close();
    }
});

export default server;
