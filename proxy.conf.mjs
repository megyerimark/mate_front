// Fejlesztéskor az /api hívásokat a Laravel backend kapja.
// Alapértelmezés: 127.0.0.1:8000 (nem „localhost”: macOS-en az IPv6-ra oldódhat, a php artisan serve pedig IPv4-en figyel).
// Más címen futó backendhez: API_TARGET=http://127.0.0.1:8001 npm start
export default {
  '/api': {
    target: process.env.API_TARGET || 'http://127.0.0.1:8000',
    secure: false,
    changeOrigin: true,
  },
};
