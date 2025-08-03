import validator from 'validator';
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
}


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

        // Creating new User
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        // Saving New User to Database
        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for Admin Login
const adminLogin = async (req, res) => {

}

export { loginUser, registerUser, adminLogin };