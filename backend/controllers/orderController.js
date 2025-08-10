import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing order using cod method 

const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderdata = {
            userId: req.user.id,
            items,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            address
        }

        const newOrder = await orderModel(orderdata)
        await newOrder.save()

        await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

        res.json({ success: true, message: "order placed successfully" })

    } catch (error) {

        console.log(error);
        res.json({ success: false, error: error.message })

    }

}

//  placing order using stripe method 

const placeOrderStripe = async (req, res) => {

}

//  placing order using Razorpay method 

const placeOrderRazorPay = async (req, res) => {

}

// All Orders data for Admin Panel

const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({});
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, error: error.message });
    }

}

// User Order Data for frontend

const userOrders = async (req, res) => {
    try {
        const userId = req.user.id; // comes from auth middleware
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: error.message });
    }
};

//  update status of the order from Admin panel

const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus }