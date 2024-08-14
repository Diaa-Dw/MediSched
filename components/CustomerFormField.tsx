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
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

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
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    renderSkeleton,
    children,
    name,
    label,
    dateFormat,
    showTimeSelect,
  } = props;
  // console.log(field);

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
              showTimeSelect={showTimeSelect || false}
              dateFormat={dateFormat ? dateFormat : "dd/MM/yyyy"}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SKELETON:
      return (
        <FormControl>
          {renderSkeleton ? renderSkeleton(field) : null}
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='shad-select-trigger'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='shad-select-content'>
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className='shad-textArea'
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor={name}
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {label}
            </label>
          </div>
        </FormControl>
      );
    default:
      return null;
  }
};

function CustomerFormField(props: CustomProps) {
  const { control, name, label, fieldType } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {label && fieldType !== FormFieldType.CHECKBOX && (
            <FormLabel className='shad-input-label'>{label}</FormLabel>
          )}

          <RenderInput field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  );
}

export default CustomerFormField;
