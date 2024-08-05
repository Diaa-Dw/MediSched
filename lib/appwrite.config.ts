import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  DATABASE_ID,
  API_KEY,
  PATIENT_COLLECTION_ID,
  APPOINTEMNT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOIN: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databeses = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
