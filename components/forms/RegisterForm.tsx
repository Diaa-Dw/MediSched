"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomerFormField, { FormFieldType } from "../CustomerFormField";
import { PatientFormValidation } from "@/lib/validation";
import { useState } from "react";
import { createUser } from "@/lib/actions/patient.action";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ...

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      birthDate: new Date(Date.now()),
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      console.log(values);
    } catch (error) {
      console.error(`error in patient form \n ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex-1 space-y-12'
      >
        <section className='space-y-4 mb-12'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Let us know more about yourself</p>
        </section>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Personal Information</h2>
          </div>

          <CustomerFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='username'
            label='Full name'
            placeholder='ex: Diaa'
            iconSrc='/assets/icons/user.svg'
            iconAlt='user'
          />

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomerFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              label='Email'
              placeholder='example@gmail.com'
              iconSrc='/assets/icons/email.svg'
              iconAlt='email'
            />

            <CustomerFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name='phone'
              label='Phone Number'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomerFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='birthDate'
              label='Date of birth'
              placeholder='Select your birth date'
              iconSrc='/assets/icons/calendar.svg'
              iconAlt='calendar'
            />

            <CustomerFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name='phone'
              label='Phone Number'
            />
          </div>
        </section>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Personal Information</h2>
          </div>

          <CustomerFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='username'
            label='Full name'
            placeholder='ex: Diaa'
            iconSrc='/assets/icons/user.svg'
            iconAlt='user'
          />

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomerFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              label='Email'
              placeholder='example@gmail.com'
              iconSrc='/assets/icons/email.svg'
              iconAlt='email'
            />

            <CustomerFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name='phone'
              label='Phone Number'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomerFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='birthDate'
              label='Date of birth'
              placeholder='Select your birth date'
              iconSrc='/assets/icons/calendar.svg'
              iconAlt='calendar'
            />

            <CustomerFormField
              fieldType={FormFieldType.}
              control={form.control}
              name='phone'
              label='Phone Number'
            />
          </div>
        </section>

        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
}

export default RegisterForm;
