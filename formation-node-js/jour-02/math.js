// math.js
// Module simple pour démontrer l'exportation de fonctions

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

// Exportation nommée (Named Exports)
module.exports.add = add;
module.exports.subtract = subtract;

// On peut aussi faire :
// module.exports = { add, subtract };
