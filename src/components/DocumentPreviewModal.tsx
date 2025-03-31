import React from 'react';
import styled from 'styled-components';

// Rename to be more generic since we'll handle HTML files too
interface DocumentPreviewModalProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: auto;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  width: 95%;
  max-width: 1600px;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.colors.headerBg};
  color: white;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DocumentContainer = styled.div`
  flex: 1;
  min-height: 700px;
  overflow: hidden;
`;

const DocumentIframe = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 700px;
  border: none;
  
  /* PDF specific styling - forces PDF to fill the iframe */
  [type="application/pdf"] {
    width: 100%;
    height: 100%;
  }
`;

const FallbackMessage = styled.div`
  padding: 20px;
  text-align: center;
`;

const FallbackButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  text-decoration: none;
  margin-top: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.text};
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ url, title, isOpen, onClose }) => {
  const [viewerType, setViewerType] = React.useState<'google' | 'direct'>('direct');
  const [loadError, setLoadError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Determine file type
  const isPdf = url.toLowerCase().endsWith('.pdf');
  
  // Reset states when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setLoadError(false);
      setIsLoading(true);
      setViewerType('direct');
    }
  }, [isOpen]);
  
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Handle closing when clicking the overlay (outside the modal content)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the actual overlay was clicked (not its children)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Handle iframe load error
  const handleIframeError = () => {
    setLoadError(true);
    setIsLoading(false);
  };
  
  // Handle iframe load success
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  // Switch between viewers
  const toggleViewer = () => {
    setViewerType(viewerType === 'direct' ? 'google' : 'direct');
    setLoadError(false);
    setIsLoading(true);
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <HeaderActions>
            {!loadError && isPdf && (
              <FallbackButton 
                as="button" 
                onClick={toggleViewer} 
                style={{ 
                  padding: '5px 10px', 
                  fontSize: '0.85rem',
                  marginTop: 0 
                }}
              >
                {viewerType === 'direct' ? 'Use Google Viewer' : 'Use Direct Viewer'}
              </FallbackButton>
            )}
            <CloseButton onClick={onClose}>×</CloseButton>
          </HeaderActions>
        </ModalHeader>
        <DocumentContainer>
          {loadError ? (
            <FallbackMessage>
              <h3>Unable to load the preview</h3>
              <p>The file might be blocked by CORS policy or another issue.</p>
              <FallbackButton href={url} target="_blank" rel="noopener noreferrer">
                Open in new tab
              </FallbackButton>
              {isPdf && viewerType === 'direct' && (
                <FallbackButton as="button" onClick={toggleViewer} style={{ marginLeft: '10px' }}>
                  Try Google Viewer
                </FallbackButton>
              )}
            </FallbackMessage>
          ) : (
            <>
              {isLoading && (
                <LoadingContainer>
                  <Spinner />
                  <p>Loading document...</p>
                </LoadingContainer>
              )}
              
              <div style={{ display: isLoading ? 'none' : 'block', height: '100%' }}>
                {isPdf ? (
                  // For PDF files
                  viewerType === 'direct' ? (
                    <DocumentIframe 
                      src={url} 
                      title={`PDF Preview: ${title}`}
                      onError={handleIframeError}
                      onLoad={handleIframeLoad}
                    />
                  ) : (
                    <DocumentIframe 
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`} 
                      title={`PDF Preview: ${title}`}
                      onError={handleIframeError}
                      onLoad={handleIframeLoad}
                    />
                  )
                ) : (
                  // For HTML files or other content
                  <DocumentIframe 
                    src={url} 
                    title={`Preview: ${title}`}
                    onError={handleIframeError}
                    onLoad={handleIframeLoad}
                  />
                )}
              </div>
            </>
          )}
        </DocumentContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DocumentPreviewModal;