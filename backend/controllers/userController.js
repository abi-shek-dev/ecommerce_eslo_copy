import validator from 'validator';
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
}


// Route for user login
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Incorrect Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

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

// Route for getting logged-in user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Route for updating logged-in user profile
const updateUserProfile = async (req, res) => {
    try {
        const {
            name = "",
            email = "",
            phone = "",
            address = "",
            city = "",
            country = ""
        } = req.body;

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        if (!trimmedName) {
            return res.json({ success: false, message: "Name is required" });
        }

        if (!validator.isEmail(trimmedEmail)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        const existingUser = await userModel.findOne({
            email: trimmedEmail,
            _id: { $ne: req.user.id }
        });

        if (existingUser) {
            return res.json({ success: false, message: "Email is already in use" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user.id,
            {
                name: trimmedName,
                email: trimmedEmail,
                phone: phone.trim(),
                address: address.trim(),
                city: city.trim(),
                country: country.trim()
            },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Route for Admin Login
const adminLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY)
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile };
