import "../styles/UploadModal.css";
import { useForm } from "../hooks/formHooks";
import { ChangeEvent, useRef, useState } from "react";
import { useFile, useMedia } from "../hooks/apiHooks";

type UploadModalProps = {
  closeModal: () => void;
};

const UploadModal = ({ closeModal }: UploadModalProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const { postFile } = useFile();
  const { postMedia } = useMedia();

  const initValues = {
    title: "",
    description: "",
  };

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  // Callback placeholder useFormia varten - vaihda tää doUploadiks
  const doFormSubmit = async () => {
    const token = localStorage.getItem("token");
    setUploading(true);
    console.log("Form submitted with values:", inputs, file);
    try {
      if (!file || !token) return;
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);
      setInputs(initValues);
      setFile(null);
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      setUploading(false);
    }
    setTimeout(() => {
      // resetForm();
      closeModal();
    }, 3000);
  };

  const { handleSubmit, handleInputChange, inputs, setInputs } = useForm(
    doFormSubmit,
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
              value={inputs.post_title}
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
            />

            {/* DESCRIPTION */}
            <textarea
              onChange={handleInputChange}
              value={inputs.post_description}
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
              onChange={handleFileChange}
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
