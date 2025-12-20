const fs = require('fs');
const path = require('path');

// Définition des chemins
const dataDir = path.join(__dirname, 'data');
const filePath = path.join(dataDir, 'message.txt');

console.log('--- Début du programme Jour 3 : Système de fichiers ---');

// 1. Création d'un dossier (s'il n'existe pas)
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    console.log('[CREATE] Dossier "data" créé.');
} else {
    console.log('[INFO] Le dossier "data" existe déjà.');
}

// 2. Écriture dans un fichier (Create/Write)
// fs.writeFile écrase le fichier s'il existe
fs.writeFile(filePath, 'Bonjour, ceci est le contenu initial.\n', (err) => {
    if (err) throw err;
    console.log('[WRITE] Fichier "message.txt" créé et écrit.');

    // 3. Ajout de contenu (Update/Append)
    fs.appendFile(filePath, 'Ceci est une nouvelle ligne ajoutée.\n', (err) => {
        if (err) throw err;
        console.log('[APPEND] Contenu ajouté au fichier.');

        // 4. Lecture du fichier (Read)
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            console.log('\n--- Contenu du fichier ---');
            console.log(data);
            console.log('--------------------------\n');

            // 5. Renommer le fichier (Rename)
            const newFilePath = path.join(dataDir, 'message_renamed.txt');
            fs.rename(filePath, newFilePath, (err) => {
                if (err) throw err;
                console.log('[RENAME] Fichier renommé en "message_renamed.txt".');

                // 6. Suppression du fichier (Delete) - commenté pour garder la trace
                // fs.unlink(newFilePath, (err) => {
                //     if (err) throw err;
                //     console.log('[DELETE] Fichier supprimé.');
                // });
            });
        });
    });
});

console.log('[INFO] Les opérations asynchrones sont lancées...');
