# Jour 19 - Sécurité et Tests

## 🔐 Sécurité implémentée

### 1. Helmet.js
Protection des en-têtes HTTP contre :
- XSS (Cross-Site Scripting)
- Clickjacking
- MIME Sniffing

```javascript
app.use(helmet({
    contentSecurityPolicy: false
}));
```

### 2. Rate Limiting
Limitation à 100 requêtes par IP toutes les 15 minutes.

```javascript
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
```

### 3. CORS
Autorisation des requêtes cross-origin.

```javascript
app.use(cors());
```

---

## 🧪 Tests avec Jest et Supertest

### Installation
```bash
npm install --save-dev jest supertest
```

### Lancer les tests
```bash
npm test
```

### Structure
- `tests/server.test.js` : Tests de base du serveur

### Ce qui est testé
1. **Health Check** : Vérification que le serveur répond
2. **404 Handling** : Routes inexistantes
3. **Concepts de sécurité** : Compréhension des middlewares

---

## 📦 Dépendances ajoutées
- `helmet` : Sécurité des en-têtes HTTP
- `express-rate-limit` : Limitation de débit
- `cors` : Cross-Origin Resource Sharing
- `jest` : Framework de test
- `supertest` : Test d'API HTTP

---

## 🚀 Démarrage
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000` avec toutes les protections activées.
