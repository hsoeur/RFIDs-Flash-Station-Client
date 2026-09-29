# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Tests d'intégration de l'API Data

Ces tests effectuent de vrais appels HTTP vers l'API Data et utilisent donc la
base de test configurée par l'API. Aucun mock réseau ou base en mémoire n'est
utilisé.

1. Démarrer l'API Data locale sur l'URL définie par `VITE_API_DATA` dans `.env`.
2. Copier `.env.integration.example` vers `.env.integration.local`.
3. Renseigner `TEST_MANUFACTURING_ORDER_UID` avec un OF existant qui possède au
   moins un programme de soudure actif, et `TEST_INVALID_MANUFACTURING_ORDER_UID`
   avec un entier inférieur ou égal à zéro.
4. Lancer `npm run test:integration:data`.

Les variables d'environnement du processus ont priorité sur
`.env.integration.local`, ce qui permet aussi l'exécution en CI :

```powershell
$env:API_DATA_BASE_URL = "http://localhost:5400/api"
$env:TEST_MANUFACTURING_ORDER_UID = "12345"
$env:TEST_INVALID_MANUFACTURING_ORDER_UID = "0"
npm run test:integration:data
```
