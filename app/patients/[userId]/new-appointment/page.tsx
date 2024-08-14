import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.action";
import Image from "next/image";
import Link from "next/link";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='container remove-scrollbar my-auto'>
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='care-pulse'
            width={1000}
            height={1000}
            className='mb-12 h-10 w-fit'
          />

          {/* <PtientForm /> */}
          <AppointmentForm
            type='create'
            userId={userId}
            patientId={patient.$id}
          />

          <p className='copyright mt-10 py-12'>© 2024 CarePluse</p>
        </div>
      </section>
      <Image
        src='/assets/images/appointment-img.png'
        alt='patient'
        width={1000}
        height={1000}
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  );
};

export default NewAppointment;
