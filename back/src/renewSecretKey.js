import fs from 'fs';
import path from 'path'
import crypto from 'crypto';

// Establezco la ruta al archivo .env
const envPath = path.join(__dirname, '.env');

// Leo el contenido actual del archivo
const currentEnvContent = fs.readFileSync(envPath, 'utf-8');

export const generateAndRenewKey = () => {
  // Genero una nueva clave
  const newKey = crypto.randomBytes(32).toString('hex');

  // Modificar el contenido según sea necesario
const updatedEnvContent = currentEnvContent + `\SECRET_KEY=${newKey}`;

  // Guardo la nueva clave en el archivo .env
  fs.writeFileSync(envPath, updatedEnvContent);

  console.log('Nueva clave generada y actualizada en el archivo .env');
}
// Ejecuto la funcion segun algun criterio
// En este caso cada 24 horas (86400000 milisegundos)
setInterval(generateAndRenewKey, 24 * 60 * 60 * 1000);
