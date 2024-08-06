import PtientForm from "@/components/forms/PatientForm";
import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='container remove-scrollbar'>
        <div className='sub-container max-w-[860px]'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='care-pulse'
            width={1000}
            height={1000}
            className='mb-12 h-10 w-fit'
          />

          <RegisterForm />

          <div className='text-14-regular mt-20 flex justify-between items-center'>
            <p className=' text-dark-600'>© 2024 CarePluse</p>
            <Link href='/?admin=true' className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src='/assets/images/register-img.png'
        alt='patient'
        width={1000}
        height={1000}
        className='side-img max-w-[390px]'
      />
    </div>
  );
}
