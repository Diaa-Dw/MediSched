"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/types/appwrite.types";
import StatusBadge from "../ui/StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModel from "../AppointmentModel";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className='text-14-medium'>{row.index + 1}</p>,
  },
  {
    accessorKey: "Patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      console.log("🚀 ~ appointment:", appointment);

      return <p className='text-14-medium'>{appointment?.patient.name}</p>;
    },
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => {
      return (
        <p className='text-14-regular '>
          {formatDateTime(row.original.schedule).dateOnly}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className='min-w-[115px]'>
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: () => "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );

      return (
        <div className='flex items-center gap-3'>
          {doctor && (
            <Image
              src={doctor?.image}
              alt={doctor?.name}
              width={100}
              height={100}
              className='size-8'
            />
          )}
          <p className='whitespace-nowrap'>{doctor?.name}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className='pl-4'>Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className='flex gap-1'>
          <AppointmentModel
            type='schedule'
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title='Schedule Appointment'
            description={"Please confirm the following scheduled"}
          />
          <AppointmentModel
            type='cancel'
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title='Cancel Appointment'
            description={"Are you sure you want to cancel this appointment?"}
          />
        </div>
      );
    },
  },
];
