const User = require('../models/User');

// @desc    Inscription utilisateur
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Créer l'utilisateur
        const user = await User.create({
            username,
            email,
            password,
            role
        });

        // Créer le token
        const token = user.getSignedJwtToken();

        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Connexion utilisateur
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si email et password sont fournis
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Veuillez fournir un email et un mot de passe' });
        }

        // Vérifier l'utilisateur (on inclut le password car select: false par défaut)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Identifiants invalides' });
        }

        // Vérifier le mot de passe
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Identifiants invalides' });
        }

        // Créer le token
        const token = user.getSignedJwtToken();

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Récupérer l'utilisateur courant
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        // Charge l'utilisateur complet depuis la DB (sans le mot de passe)
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
