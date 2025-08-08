import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { useRef } from "react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
const Upload = ({ setImg }) => {

  const ikUploadRef = useRef(null);


  // 👉 Upload Handlers
  const handleUploadStart = (evt) => {
    console.log("Upload Started:", evt);
    setImg((prev) => ({ ...prev, isLoading: true }));
  };

  const handleUploadProgress = (progress) => {
    console.log("Upload Progress:", progress);
  };

 const handleUploadSuccess = (res) => {
   console.log("Upload Success:", res);
   setImg((prev) => ({
     ...prev,
     isLoading: false,
     dbData: {
       filePath: res.filePath,
     },
   }));
 };

  const handleUploadError = (err) => {
    console.error("Upload Error:", err);
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="imagekit-upload-example.jpg"
        useUniqueFileName={true}
        onUploadStart={handleUploadStart}
        onUploadProgress={handleUploadProgress}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
        style={{ display: "none" }} // Hide the upload button
        ref={ikUploadRef}
      />
      {
        <label onClick={() => ikUploadRef.current.click()}>
          <img src="/attachment.png" alt="" />
        </label>
      }
    </IKContext>
  );
};

export default Upload;
