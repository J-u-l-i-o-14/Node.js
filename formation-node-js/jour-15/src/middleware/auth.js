const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/env');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded.id;
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Accès non autorisé, token manquant' });
    }
};
