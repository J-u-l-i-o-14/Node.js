// middleware/logger.js

const logger = (req, res, next) => {
    const date = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    console.log(`[${date}] ${method} ${url}`);

    // IMPORTANT : Toujours appeler next() pour passer au middleware suivant
    // Sinon la requête reste bloquée ici !
    next();
};

module.exports = logger;
