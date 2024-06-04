import * as admin from "firebase-admin/app";
import {
  BaseAuth,
  GetUsersResult,
  ListUsersResult,
  getAuth,
} from "firebase-admin/auth";

export const connectFirebase = (): void => {
  const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  admin.initializeApp({
    credential: admin.applicationDefault(),
  });

  console.log("Firebase connected");
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
