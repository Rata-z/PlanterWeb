import * as app from "firebase-admin/app";
import admin from "firebase-admin";
import { ListUsersResult, getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const connectFirebase = (): void => {
  const buffer = Buffer.from(
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    "base64"
  );
  const credential = JSON.parse(buffer.toString("utf-8"));

  app.initializeApp({
    credential: admin.credential.cert(credential),
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
