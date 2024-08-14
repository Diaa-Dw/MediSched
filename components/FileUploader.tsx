import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadrProps {
  files: File[];
  onChange: (files: File[]) => void;
}

const FileUploader = ({ files, onChange }: FileUploadrProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("🚀 ~ onDrop ~ acceptedFiles:", acceptedFiles);
    onChange(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className='bg-dark-400 py-10 px-4 rounded-lg border border-dark-600 flex items-center justify-center flex-col gap-4 '
    >
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt='uploaded image'
          className='max-h-[300px] w-fit overflow-hidden object-cover'
        />
      ) : (
        <>
          <Image
            src='/assets/icons/upload.svg'
            alt='upload'
            width={100}
            height={100}
            className='w-fit'
          />
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className='text-green-500'>Drop the files here ...</p>
          ) : (
            <p className='text-dark-600 text-sm text-center'>
              <span className='text-green-500'>Click to upload</span> or drag
              and drop SVG, PNG, JPG or GIF(max 800*400)
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default FileUploader;
