import "../styles/UploadModal.css";
import { useForm } from "../hooks/formHooks";
import { useRef, useState } from "react";

type UploadModalProps = {
  closeModal: () => void;
};

const UploadModal = ({ closeModal }: UploadModalProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const initValues = {
    title: "",
    description: "",
  };
  const fileRef = useRef<HTMLInputElement>(null);

  // Callback placeholder useFormia varten - vaihda tää doUploadiks
  const handleFormSubmit = () => {
    setUploading(true);
    console.log("Form submitted with values:", inputs, file);
    closeModal();
  };

  const { handleSubmit, handleInputChange, inputs, setInputs } = useForm(
    handleFormSubmit,
    initValues
  );

  // Reset form
  const resetForm = () => {
    setInputs(initValues);
    setUploading(false);
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className="upload-modal">
      <div className="modal-content">
        <div>
          <button className="close" onClick={closeModal}>
            X
          </button>
        </div>
        <div>
          <h2>Upload</h2>

          <form action="" className="upload-form" onSubmit={handleSubmit}>
            {/* TITLE */}
            <input
              onChange={handleInputChange}
              value={inputs.title}
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
            />

            {/* DESCRIPTION */}
            <textarea
              onChange={handleInputChange}
              value={inputs.description}
              name="description"
              id="description"
              placeholder="Description"
              required
              rows={4}
            ></textarea>

            {/* FILE */}
            <input
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
              ref={fileRef}
            />
            <div>
              {" "}
              <button type="submit">Post</button>
              {uploading ? (
                <p className="post-success-text">Post added succesfully!</p>
              ) : (
                ""
              )}
            </div>
          </form>
          <button className="reset" onClick={resetForm}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
