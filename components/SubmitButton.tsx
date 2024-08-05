import Image from "next/image";
import { Button } from "./ui/button";

interface SubmitButtonParams {
  isLoading: boolean;
}

const SubmitButton = ({ isLoading }: SubmitButtonParams) => {
  return (
    <Button
      type='submit'
      className='text-center w-full bg-green-500 rounded-md'
      disabled={isLoading}
    >
      {isLoading ? (
        <div className='flex items-center gap-3'>
          <Image
            src='/assets/icons/loader.svg'
            alt='spinner'
            width={100}
            height={100}
            className='w-fit h-auto'
          />
          <span>Loading...</span>
        </div>
      ) : (
        "Submit"
      )}
    </Button>
  );
};

export default SubmitButton;
