"use server";
import { ID, Query } from "node-appwrite";
import {
  APPOINTEMNT_COLLECTION_ID,
  DATABASE_ID,
  databeses,
  messaging,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databeses.createDocument(
      DATABASE_ID!,
      APPOINTEMNT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(`Somthing went wrong while creating appointment ${error}`);
  }
};

export const getAppointment = async (appointemntId: string) => {
  try {
    const appointment = await databeses.getDocument(
      DATABASE_ID!,
      APPOINTEMNT_COLLECTION_ID!,
      appointemntId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.log(`Somthing went wrong while fetching appointment ${error}`);
  }
};

export const getRecentAppointments = async () => {
  try {
    const appointments = await databeses.listDocuments(
      DATABASE_ID!,
      APPOINTEMNT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else {
          acc.cancelledCount += 1;
        }

        return acc;
      },
      initialCount
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log(`Somthing went wrong while fetching appointment ${error}`);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databeses.updateDocument(
      DATABASE_ID!,
      APPOINTEMNT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updatedAppointment) {
      throw new Error(`Appointment not found`);
    }

    const smsMessage = `Hi, it's carePulse. 
    your appointment has been ${type}.`;

    await sendSMSNotification(userId, smsMessage);

    //*SMS notification
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(`Somthing went wrong while updating appointment ${error}`);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
