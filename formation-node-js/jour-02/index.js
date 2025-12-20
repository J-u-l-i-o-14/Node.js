// index.js
// Importation des modules
const math = require('./math'); // Le .js est facultatif
const logger = require('./logger');

console.log('--- Début du programme Jour 2 ---');

// Utilisation du module math
const resultAdd = math.add(5, 3);
console.log(`Addition (5 + 3) : ${resultAdd}`);

const resultSub = math.subtract(10, 4);
console.log(`Soustraction (10 - 4) : ${resultSub}`);

// Utilisation du module logger
logger('Ceci est un message important');

console.log('--- Fin du programme ---');
