"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

function PtientForm() {
  // ...

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>

              <FormMessage className='shad-error' />
            </FormItem>
          )}
        /> */}
        {/*! input form to take the user's name */}
        <CustomerFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='username'
          label='User Name'
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
        />

        <CustomerFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name='phone'
          label='Phone Number'
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export default PtientForm;
