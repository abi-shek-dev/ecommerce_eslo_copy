import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

// global variables

const currency = 'inr'
const deliveryCharge = 10

// Gateways initialization

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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

    try {

        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderdata = {
            userId: req.user.id,
            items,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
            address
        }

        const newOrder = await orderModel(orderdata)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Fee',
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })
        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, error: error.message })
    }

}

// verify stripe payment after successful transaction 
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {

        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successful" })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, error: error.message })
    }
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

    try {

        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "status updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, error: error.message });
    }

}

export { placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus, verifyStripe }