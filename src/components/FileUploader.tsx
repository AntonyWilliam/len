import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in bytes
}

const UploaderContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UploadButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const PreviewContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const FilePreview = styled.img`
  max-width: 200px;
  max-height: 150px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.background};
`;

const FileName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  word-break: break-all;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  acceptedFileTypes = 'image/*',
  maxFileSize = 2 * 1024 * 1024 // 2MB default
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) {
      return;
    }
    
    // Validate file type
    if (!selectedFile.type.match(acceptedFileTypes.replace(/\*/g, '.*'))) {
      setError(`Invalid file type. Please upload ${acceptedFileTypes}`);
      return;
    }
    
    // Validate file size
    if (selectedFile.size > maxFileSize) {
      setError(`File size should be less than ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreviewUrl(objectUrl);
    
    // Call the callback
    onFileSelect(selectedFile);
    
    // Clean up the object URL when component unmounts or when a new file is selected
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <UploaderContainer>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        style={{ display: 'none' }}
      />
      
      <UploadButton type="button" onClick={handleButtonClick}>
        {previewUrl ? (
          <PreviewContainer>
            <FilePreview src={previewUrl} alt="Preview" />
            <FileName>{file?.name}</FileName>
            <div>Click to change</div>
          </PreviewContainer>
        ) : (
          <>
            <i className="fa fa-cloud-upload" style={{ fontSize: '2em', marginBottom: '10px' }}></i>
            <div>Click to upload logo image</div>
            <div style={{ fontSize: '0.8em', opacity: 0.7 }}>
              {acceptedFileTypes.replace('image/*', 'Images')} up to {maxFileSize / (1024 * 1024)}MB
            </div>
          </>
        )}
      </UploadButton>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </UploaderContainer>
  );
};

export default FileUploader;