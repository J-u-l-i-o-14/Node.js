const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);

    // Gestion basique du routing
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Extension du fichier
    const extname = path.extname(filePath);

    // Si pas d'extension, on suppose que c'est une page HTML (ex: /about -> /about.html)
    if (!extname) {
        filePath += '.html';
    }

    // Types MIME supportés
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
    };

    const contentType = mimeTypes[extname] || 'text/html';

    // Lecture du fichier
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page non trouvée -> 404
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content404, 'utf8');
                });
            } else {
                // Erreur serveur
                res.writeHead(500);
                res.end(`Erreur serveur: ${err.code}`);
            }
        } else {
            // Succès
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
