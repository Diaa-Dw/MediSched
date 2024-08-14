"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import CustomerFormField, { FormFieldType } from "../CustomerFormField";
import { UserFormValidation } from "@/lib/validation";
import { useState } from "react";
import Image from "next/image";
import { createUser } from "@/lib/actions/patient.action";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";

function PtientForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ...

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      const newUser = await createUser(values);
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.error(`error in patient form \n ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there 👋</h1>
          <p className='text-dark-700'>Get started with appointments.</p>
        </section>

        {/*! input form to take the user's name */}
        <CustomerFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='name'
          label='Full name'
          placeholder='ex: Diaa'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />

        {/*! input form to take the user's email */}
        <CustomerFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='email'
          label='Email'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email'
          placeholder='example@gmail.com'
        />

        <CustomerFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name='phone'
          label='Phone Number'
          placeholder='0342 0453 34'
        />

        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
}

export default PtientForm;
