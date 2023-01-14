import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default __dirname; // Aca declaro el dirname como vi y en app.js tengo lo otro