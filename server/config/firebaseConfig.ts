import * as admin from "firebase-admin/app";
import { ListUsersResult, getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const connectFirebase = (): void => {
  const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  admin.initializeApp({
    credential: admin.applicationDefault(),
  });

  console.log("Firebase connected");
};

export const connectFirestore = (): FirebaseFirestore.Firestore => {
  const db = getFirestore();
  console.log("Firestore connected");

  return db;
};

export const listUsers = async (): Promise<ListUsersResult> => {
  try {
    const auth = getAuth();
    const users = await auth.listUsers();
    return users;
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};
