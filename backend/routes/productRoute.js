import express from "express";
import { listProduct, addProduct, removeProduct, singleProduct, addRating, getRatings } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js"; // token verification

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProduct);

// New routes for ratings
productRouter.post('/rate', authUser, addRating);
productRouter.get('/ratings/:productId', authUser, getRatings);

export default productRouter;
