import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    rating: { type: Number, min: 1, max: 5, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean, default: false },
    date: { type: Number, required: true },
    ratings: [ratingSchema] // <-- added field
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
