const jwt = require('jsonwebtoken'); // Importe la librairie pour gérer les JSON Web Tokens
const User = require('../models/User'); // Importe le modèle User pour vérifier l'utilisateur en base

// Middleware pour protéger les routes
exports.protect = async (req, res, next) => {
    let token; // Variable pour stocker le token extrait

    // Vérifie si le header Authorization existe et commence par 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Récupère le token en séparant la chaîne "Bearer <token>" (prend la 2ème partie)
            token = req.headers.authorization.split(' ')[1];

            // Vérifie la validité du token avec la clé secrète (décode le payload)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Stocke uniquement l'ID de l'utilisateur (pas de requête DB ici)
            // Le contrôleur chargera l'utilisateur complet si nécessaire
            req.userId = decoded.id;

            // Passe au middleware suivant (ou au contrôleur)
            next();
        } catch (error) {
            // En cas d'erreur (token invalide, expiré, malformé...)
            console.error(error); // Log l'erreur pour le débogage
            return res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
        }
    }

    // Si aucun token n'a été trouvé dans le header
    if (!token) {
        return res.status(401).json({ success: false, message: 'Accès non autorisé, token manquant' });
    }
};
