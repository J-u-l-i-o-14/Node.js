// logger.js
// Module pour simuler un système de log

const url = 'http://mylogger.io/log';

function log(message) {
    // Ici, on enverrait une requête HTTP en temps normal
    console.log(`[LOG] ${message} (envoyé à ${url})`);
}

// Exportation d'une seule fonction (Default Export pattern in CommonJS)
module.exports = log;

// Si on voulait exporter l'url aussi :
// module.exports.log = log;
// module.exports.endPoint = url;
