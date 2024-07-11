import { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toastError } from 'utils/toast';

const baseStyle = {
  transition: 'all 0.24s ease',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  justifyContent: 'center',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#4F46E5',
  borderStyle: 'dashed',
  backgroundColor: '#e7e6ff',
  color: '#5d54ff',
  outline: 'none',
  // transition: 'border .24s ease-in-out',
  height: '100%',
};

const focusedStyle = {
  borderColor: '#4F46E5',
  fontSize: '1rem'
};

const acceptStyle = {
  borderColor: '#837df3',
  fontSize: '0.95rem'
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface FileInputProps {
  onChange: (file: File[]) => void;
}

function FileInput({ onChange }: FileInputProps) {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      multiple: true,
      accept: { 'image/*': [], 'image/webp': [] },
      onDropAccepted(files, event) {
        for(const file of files){
          if(file.size > 4 * 1024 * 1024) {
            toastError('File size must be less than 3MB')
            return;
          }
        }
        const previews = files.map((file) => URL.createObjectURL(file));
        setFilePreviews(previews);
        onChange(files);
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
