import validator from 'validator';
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';


// Route for user login
const loginUser = async (req, res) => {

}

// Route for user signup
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        //  Check if the user already exists in the database
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" })
        }

        //  validating emsil and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    } catch (error) {

    }
}

// Route for Admin Login
const adminLogin = async (req, res) => {

}

export { loginUser, registerUser, adminLogin };