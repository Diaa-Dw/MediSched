"use server";
import { ID, Query } from "node-appwrite";

import { InputFile } from "node-appwrite/file";

import {
  BUCKET_ID,
  DATABASE_ID,
  databeses,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error("An error occured while retrieving the user details");
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  console.log("test-2");

  try {
    console.log("test-2");

    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument.get("blobFile") as Blob,
          identificationDocument.get("fileName") as string
        );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      console.log("🚀 ~ file:", file);
    }

    const newPatinent = await databeses.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );
    console.log("🚀 ~ newPatinent:", newPatinent);
    console.log("🚀 ~ newPatinent:", newPatinent);

    return parseStringify(newPatinent);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await databeses.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log("🚀 ~ getPatient ~ error:", error);

    console.error("An error occured while retrieving the patient details");
  }
};
