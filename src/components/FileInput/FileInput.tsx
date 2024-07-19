import imageCompression from "browser-image-compression";
import heic2any from "heic2any";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toastError } from "utils/toast";

const baseStyle = {
  transition: "all 0.24s ease",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  justifyContent: "center",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#4F46E5",
  borderStyle: "dashed",
  backgroundColor: "#e7e6ff",
  color: "#5d54ff",
  outline: "none",
  // transition: 'border .24s ease-in-out',
  height: "100%",
};

const focusedStyle = {
  borderColor: "#4F46E5",
  fontSize: "1rem",
};

const acceptStyle = {
  borderColor: "#837df3",
  fontSize: "0.95rem",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

interface FileInputProps {
  onChange: (file: File[]) => void;
}

function FileInput({ onChange }: FileInputProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      multiple: true,
      accept: { "image/*": [], "image/heic": [], "image/webp": [] },
      async onDropAccepted(files, event) {
        setIsLoading(true);

        const convertHeicToJpeg = (file: File): Promise<File | null> => {
          return new Promise<File | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async function (e: ProgressEvent<FileReader>) {
              try {
                if (e.target) {
                  const blob = new Blob(
                    [new Uint8Array(e.target.result as ArrayBuffer)],
                    { type: file.type }
                  );
                  const conversionResult = await heic2any({
                    blob,
                    toType: "image/jpeg",
                  });
                  const convertedBlob = Array.isArray(conversionResult)
                    ? conversionResult[0]
                    : conversionResult;
                  const convertedFile = new File(
                    [convertedBlob],
                    file.name.replace(/\.heic$/, ".jpg"),
                    {
                      type: "image/jpeg",
                    }
                  );
                  resolve(convertedFile);
                }
              } catch (error) {
                toastError("Failed to convert HEIC to JPG");
                reject(null);
              }
            };
            reader.onerror = () => reject(null);
            reader.readAsArrayBuffer(file);
          });
        };

       

        const convertedFiles: Array<File | null> = await Promise.all(
          files.map(async (file) => {
            if (file.type === "image/heic") {
              return await convertHeicToJpeg(file);
            }
            return file;
          })
        );

        const compressImage = async (file: File): Promise<File> => {
          const options = {
            maxSizeMB: 1, // Maximum size in MB
            maxWidthOrHeight: 1920, // Max dimension
            useWebWorker: true,
          };
          try {
            const compressedBlob =  await imageCompression(file, options);
            return new File([compressedBlob], file.name, {
              type: file.type,
              lastModified: file.lastModified,
            });

          } catch (error) {
            toastError("Failed to compress image");
            return file;
          }
        };


        const filteredFiles = convertedFiles.filter(
          (file) => file !== null
        ) as File[];
        
        console.log(">>>>>>>>> filtered files >>>>>>>>", filteredFiles)
        for (let i = 0; i < filteredFiles.length; i++) {
          const file = filteredFiles[i];
          if (file instanceof File && file.size > 4 * 1024 * 1024) {
            toastError(`${file.name} size must be less than 4MB`);
            filteredFiles.splice(i, 1);
          }
        }

        const compressedFiles: File[] = await Promise.all(
          filteredFiles.map((file) => {
            const val = compressImage(file);
            console.log(">>>>>>... value >>>>>>>>>.", val)
            return val
          })
        );

        const validFiles:any = compressedFiles;
        console.log(">>>>>>>>>>>>>>>> valid Files >>>>>>>>>>", validFiles, filteredFiles)
        onChange(validFiles);
        setIsLoading(false);
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  if (isLoading) {
    return (
      <div className="w-full h-[200px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
    );
  }

  return (
    <>
      <div className="h-[200px]">
        {/* @ts-ignore */}
        <div
          className="cursor-pointer  w-full"
          // @ts-ignore
          {...getRootProps({ style })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
    </>
  );
}

export default FileInput;
