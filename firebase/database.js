import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from './config.js';

export const addUser = async (userId, userData) => {
    try {
        await setDoc(doc(db, 'users', userId), userData);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUser = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addSubscription = async (userId, subscription) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            subscriptions: arrayUnion(subscription)
        });
    } catch (error) {
        throw new Error(error.message);
    }
};