// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log l'erreur dans le terminal

    // Format de réponse standardisé pour les erreurs
    res.status(500).json({
        success: false,
        message: 'Une erreur interne est survenue !',
        error: err.message // À éviter en prod pour ne pas fuiter des infos sensibles
    });
};

module.exports = errorHandler;
