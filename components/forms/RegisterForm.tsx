"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import CustomerFormField, { FormFieldType } from "../CustomerFormField";
import { PatientFormValidation } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { registerPatient } from "@/lib/actions/patient.action";

function RegisterForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ...

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
      birthDate: new Date(Date.now()),
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };
      const newPatient = await registerPatient(patient);
      console.log("🚀 ~ onSubmit ~ newPatient:", newPatient);
      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
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

          {/* Pernsoal Information from */}
        </section>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Personal Information</h2>
          </div>

          <CustomerFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='name'
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
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name='gender'
              label='Gender'
              renderSkeleton={(field) => {
                return (
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className='flex items-center gap-6'
                  >
                    {GenderOptions.map((gender) => (
                      <div
                        className={`flex items-center w-full space-x-2 py-3.5 rounded-md border-2 border-dark-500 border-dashed px-4  ${
                          gender === field.value ? "bg-dark-400" : "bg-dark-300"
                        }`}
                        key={gender}
                      >
                        <RadioGroupItem value={gender} id={gender} />
                        <Label htmlFor={gender}>{gender}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                );
              }}
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomerFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='address'
              label='Address'
              placeholder='ex: 14 street, New York, NY - 5101'
            />
            <CustomerFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='occupation'
              label='Occupation'
              placeholder='Software engineer'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomerFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='emergencyContactName'
              label='Emergency contact name'
              placeholder='example@gmail.com'
              iconSrc='/assets/icons/email.svg'
              iconAlt='email'
            />

            <CustomerFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name='emergencyContactNumber'
              label='Phone Number'
            />
          </div>
        </section>

        {/* Medical Information from */}
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Medical Information</h2>
          </div>
          <CustomerFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name='primaryPhysician'
            placeholder='Primary care physician'
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className='flex cursor-pointer items-center gap-2'>
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt='doctor'
                    className='rounded-full border border-dark-500'
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomerFormField>
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomerFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='insuranceProvider'
              label='Insurance Provider'
              placeholder='ex: BlueCross'
            />

            <CustomerFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='insurancePolicyNumber'
              label='Insurance Provider Number'
              placeholder='ex: ABC1234567'
            />
          </div>
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomerFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='allergies'
              label='Alergies (if any)'
              placeholder='ex: Peanuts, Penicillin, Pollen'
            />

            <CustomerFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='currentMedication'
              label='Current medications'
              placeholder='ex: Ibuprofen 200mg, Levothyroxine 50mcg'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomerFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='familyMedicalHistory'
              label='Family medical history (if relevant)'
              placeholder='ex: Mother had breast cancer'
            />

            <CustomerFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='pastMedicalHistory'
              label='Past medical history'
              placeholder='ex: Asthma diagnosis in childhood'
            />
          </div>
        </section>

        {/* Identification and Verfication */}
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Identification and Verfication</h2>
          </div>

          <CustomerFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name='identificationType'
            placeholder='Identification Type'
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                <div className='flex cursor-pointer items-center gap-2'>
                  <p>{type}</p>
                </div>
              </SelectItem>
            ))}
          </CustomerFormField>

          <CustomerFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='identificationNumber'
            label='Identification Number'
            placeholder='ex: 1234567'
          />

          <CustomerFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name='identificationDocument'
            label='Scanned Copy of Identification Document'
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />

          <CustomerFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='treatmentConsent'
            label='I consent to receive treatment for my health condition.'
          />

          <CustomerFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I consent to the use and disclosure of my health'
          />

          <CustomerFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I acknowledge that I have reviewed and agree to the
            privacy policy'
          />
        </section>

        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
}

export default RegisterForm;
