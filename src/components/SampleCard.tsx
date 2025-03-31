import React, { useState } from 'react';
import styled from 'styled-components';
import { Sample } from '../types';
import DocumentPreviewModal from './DocumentPreviewModal';

interface SampleCardProps {
  sample: Sample;
}

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.default};
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.hover};
    transform: translateY(-4px);
  }
`;

const CardHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.headerBg};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const Year = styled.span`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.small};
  opacity: 0.8;
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CategoryTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CategoryTag = styled.div<{ type: 'industry' | 'type' | 'audience' | 'year' }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  background-color: ${({ theme, type }) => theme.colors[`${type}Light`]};
  color: ${({ theme, type }) => theme.colors[type]};
  margin-right: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TagIcon = styled.span`
  margin-right: 4px;
  font-size: 12px;
`;

const Industry = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: none; /* Hide the old versions */
`;

const Type = styled.div`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: none; /* Hide the old versions */
`;

const Audience = styled.div`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: none; /* Hide the old versions */
`;

const Notes = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-grow: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  width: 100%;
  min-height: 42px;
  
  /* Fix button visibility */
  opacity: 1;
  transition: opacity 0.3s ease;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const BaseButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white} !important;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  text-decoration: none !important;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  /* Force icon and text visibility */
  & i, & span {
    color: #ffffff !important;
    opacity: 1 !important;
    visibility: visible !important;
    transition: none !important;
  }
  
  /* Override possible hover transitions affecting children */
  &:hover i, &:hover span {
    color: #ffffff !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
`;

const PreviewButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  
  &, & i, & span {
    color: #ffffff !important;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:hover, &:hover i, &:hover span {
    color: #ffffff !important;
  }
`;

const DownloadButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.headerBg};
  
  &, & i, & span {
    color: #ffffff !important;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.headerBg};
  }
  
  &:hover, &:hover i, &:hover span {
    color: #ffffff !important;
  }
`;

const SampleCard: React.FC<SampleCardProps> = ({ sample }) => {
  // State to control the PDF preview modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function to get the proper path for a sample file
  const getLocalFilePath = (sampleUrl: string): string => {
    // Check if the URL is absolute (starts with http:// or https://)
    if (sampleUrl.startsWith('http://') || sampleUrl.startsWith('https://')) {
      // For HTTP URLs, ensure they're HTTPS for the Google PDF viewer
      if (sampleUrl.startsWith('http://')) {
        return sampleUrl.replace('http://', 'https://');
      }
      // Return the original URL for external links that are already HTTPS
      return sampleUrl;
    }
    
    // If the URL is relative, make it absolute relative to the public folder
    return `${window.location.origin}${sampleUrl}`;
  };
  
  // Function to handle preview button click
  const handleViewSample = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent the default link behavior
    
    const processedLink = getLocalFilePath(sample.link);
    
    console.log(`Opening sample preview: ${sample.title}`);
    console.log(`URL: ${processedLink}`);
    
    // Check if it's an external link
    const isExternalLink = sample.type === 'External Link' || 
                          (sample.link.startsWith('http://') || sample.link.startsWith('https://'));
    
    // Check file type
    const isPdf = processedLink.toLowerCase().endsWith('.pdf');
    const isHtml = processedLink.toLowerCase().includes('.htm');
    
    if (isExternalLink) {
      // For external links, open in a new tab
      window.open(processedLink, '_blank', 'noopener,noreferrer');
    } else if (isPdf) {
      // Open the modal for PDF preview
      setIsModalOpen(true);
    } else if (isHtml) {
      // For HTML files, embed in an iframe in our modal
      setIsModalOpen(true);
    } else {
      // For other file types, open in a new tab
      window.open(processedLink, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Function to get the filename from a URL
  const getFilenameFromUrl = (url: string): string => {
    // Extract the filename from the URL
    const pathParts = url.split('/');
    let filename = pathParts[pathParts.length - 1];
    
    // Clean up any query parameters
    if (filename.includes('?')) {
      filename = filename.split('?')[0];
    }
    
    return filename;
  };
  
  // Function to handle download button click
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if it's an external link
    const isExternalLink = sample.type === 'External Link' || 
                          (sample.link.startsWith('http://') || sample.link.startsWith('https://'));
    
    if (isExternalLink) {
      e.preventDefault(); // Prevent download attribute behavior
      // For external links, open in a new tab instead of downloading
      window.open(sample.link, '_blank', 'noopener,noreferrer');
      return;
    }
    
    const link = getLocalFilePath(sample.link);
    const filename = getFilenameFromUrl(sample.link);
    
    console.log(`Downloading file: ${filename}`);
    console.log(`From URL: ${link}`);
    
    // The download attribute should handle the download automatically,
    // but we can log for debugging purposes
  };
  
  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Title>{sample.title}</Title>
          <Year>({sample.year})</Year>
        </CardHeader>
        <CardBody>
          {/* Keep these for backward compatibility */}
          <Industry>{sample.industry}</Industry>
          <Type>{sample.type}</Type>
          <Audience>Audience: {sample.audience}</Audience>
          
          {/* New color tag categories */}
          <CategoryTagsContainer>
            <CategoryTag type="industry">
              <TagIcon><i className="fas fa-building"></i></TagIcon>
              {sample.industry}
            </CategoryTag>
            
            <CategoryTag type="type">
              <TagIcon><i className="fas fa-file-alt"></i></TagIcon>
              {sample.type}
            </CategoryTag>
            
            <CategoryTag type="audience">
              <TagIcon><i className="fas fa-users"></i></TagIcon>
              {sample.audience}
            </CategoryTag>
            
            <CategoryTag type="year">
              <TagIcon><i className="fas fa-calendar-alt"></i></TagIcon>
              {sample.year}
            </CategoryTag>
          </CategoryTagsContainer>
          
          <Notes>{sample.notes}</Notes>
          <ButtonsContainer>
            <PreviewButton 
              href={sample.link} 
              onClick={handleViewSample}
            >
              <i className={`fas ${sample.type === 'External Link' ? 'fa-external-link-alt' : 'fa-eye'}`} style={{ marginRight: '8px', color: '#ffffff' }}></i>
              <span style={{ color: '#ffffff' }}>{sample.type === 'External Link' ? 'Open Link' : 'Preview'}</span>
            </PreviewButton>
            <DownloadButton 
              href={getLocalFilePath(sample.link)}
              download={sample.type !== 'External Link' ? getFilenameFromUrl(sample.link) : undefined}
              onClick={handleDownload}
            >
              <i className={`fas ${sample.type === 'External Link' ? 'fa-external-link-alt' : 'fa-download'}`} style={{ marginRight: '8px', color: '#ffffff' }}></i>
              <span style={{ color: '#ffffff' }}>{sample.type === 'External Link' ? 'Visit Site' : 'Download'}</span>
            </DownloadButton>
          </ButtonsContainer>
        </CardBody>
      </Card>
      
      {/* Document Preview Modal */}
      <DocumentPreviewModal
        url={getLocalFilePath(sample.link)}
        title={sample.title}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default SampleCard;