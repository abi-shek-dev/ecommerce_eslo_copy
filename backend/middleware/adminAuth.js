import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ success: false, message: "Forbidden: Invalid token" });
    }

    next();

  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: " + error.message });
  }
};

export default adminAuth;
