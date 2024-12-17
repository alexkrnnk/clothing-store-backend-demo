import multer from "multer";
import path from "path";

/**
 * Multer storage engine configuration for uploading product images.
 * @param {string} path - The destination path for storing images.
 * @returns {object} Multer disk storage engine configuration.
 */
const fileStorageEngineAvatar = (path) =>
    multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, path);
        },

        filename: (_req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    });

/**
 * Multer middleware configuration for uploading product images.
 * @type {Multer}
 */
const uploadProductsImage = multer({ storage: fileStorageEngineAvatar("./assets/images/products/") });
export default uploadProductsImage;
