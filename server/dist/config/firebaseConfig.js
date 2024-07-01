import * as admin from "firebase-admin/app";
import { getAuth, } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
export const connectFirebase = () => {
    const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    admin.initializeApp({
        credential: admin.applicationDefault(),
    });
    console.log("Firebase connected");
};
export const connectFirestore = () => {
    const db = getFirestore();
    console.log("Firestore connected");
    return db;
};
export const listUsers = async () => {
    try {
        const auth = getAuth();
        const users = await auth.listUsers();
        return users;
    }
    catch (error) {
        console.error("Error ", error);
        throw error;
    }
};
//# sourceMappingURL=firebaseConfig.js.map