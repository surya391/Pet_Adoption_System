import jwt from 'jsonwebtoken';

export default function authenticationUser(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ errors: "Token is required." });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = { userId: tokenData.userId, role: tokenData.role}
        // req.userId = tokenData.userId; // Fix the key name to match the payload
        // req.role = tokenData.role
        next();
    } catch (err) {
        return res.status(401).json({ errors: err.message });
    }
}
