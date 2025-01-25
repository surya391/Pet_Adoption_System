import jwt from 'jsonwebtoken';

export default function authenticationUser(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: "Token is required." });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        if(!tokenData){
            return res.status(403).json({error:[{msg:"Token is invalid"}]})
        }
        req.currentUser = { userId: tokenData.userId, role: tokenData.role, name: tokenData.name}
        // req.userId = tokenData.userId; // Fix the key name to match the payload
        // req.role = tokenData.role
        next();
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
}
