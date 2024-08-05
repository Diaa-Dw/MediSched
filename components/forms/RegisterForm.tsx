"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomerFormField, { FormFieldType } from "../CustomerFormField";
import { UserFormValidation } from "@/lib/validation";
import { useState } from "react";
import { createUser } from "@/lib/actions/patient.action";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ...

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      username: "",
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
        <CustomerFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='username'
          label='User Name'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />

        <CustomerFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='email'
          label='Email'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email'
        />

        <CustomerFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name='phone'
          label='Phone Number'
        />

        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
}

export default RegisterForm;
