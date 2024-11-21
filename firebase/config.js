import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBRhMEvFk0mcP0EatrhiZA_vojf40cgPhQ",
    authDomain: "flowly-b92e6.firebaseapp.com",
    projectId: "flowly-b92e6",
    storageBucket: "flowly-b92e6.firebasestorage.app",
    messagingSenderId: "573960584966",
    appId: "1:573960584966:web:35d8761c9755676a82a887"
};

// Inicializar Firebase solo una vez
const app = initializeApp(firebaseConfig);

// Exportar instancias únicas
export const auth = getAuth(app);
export const db = getFirestore(app);
