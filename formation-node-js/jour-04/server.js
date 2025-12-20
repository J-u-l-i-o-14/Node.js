const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);

    if (req.url === '/') {
        // Servir la page HTML
        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erreur interne du serveur');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (req.url === '/api') {
        // Servir du JSON
        const data = {
            message: 'Ceci est une réponse API JSON',
            date: new Date()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } else {
        // 404 Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page non trouvée (404)');
    }
});

server.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
