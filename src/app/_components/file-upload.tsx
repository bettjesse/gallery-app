import { UploadDropzone } from "~/lib/uploadthing";
import { ourFileRouter } from "../api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0 && res[0]?.url) {
          onChange(res[0].url);
        } else {
          onChange(undefined); // Handle case where URL is not available
        }
      }}
      // Optionally handle upload errors
      // onUploadError={(error: Error) => {
      //   toast.error(`${error?.message}`);
      // }}
    />
  );
};

export default FileUpload