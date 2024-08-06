import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Image from "next/image";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-number-input";
//*css
import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";

export enum FormFieldType {
  "INPUT" = "input",
  "TEXTAREA" = "textarea",
  "PHONE_INPUT" = "phoneInput",
  "CHECKBOX" = "checkbox",
  "DATE_PICKER" = "datePicker",
  "SELECT" = "select",
  "SKELETON" = "skeleton",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              className='shad-input border-0'
              {...field}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <FormControl>
            <PhoneInput
              defaultCountry='PS'
              placeholder={placeholder}
              className='shad-input border-0 pl-2'
              {...field}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className='ml-2'
            />
          )}
          <FormControl>
            <DatePicker
              placeholder={placeholder}
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className='date-picker'
              dateFormat='dd/MM/yyyy'
            />
          </FormControl>
        </div>
      );
    default:
      return null;
  }
};

function CustomerFormField(props: CustomProps) {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {label && <FormLabel className='shad-input-label'>{label}</FormLabel>}

          <RenderInput field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  );
}

export default CustomerFormField;
