import React, { useState } from 'react';
import styled from 'styled-components';
import { useLogos } from '../context/LogosContext';
import FileUploader from '../components/FileUploader';

const LogosPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`;

const LogosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

// Create a dummy element to reference in the hover styles
const LogoCardElement = styled.div``;

const LogoCard = styled(LogoCardElement)<{ featured: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.default};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: ${({ theme }) => theme.transitions.default};
  border: ${({ featured, theme }) => featured ? `2px solid ${theme.colors.primary}` : 'none'};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.hover};
    transform: translateY(-4px);
  }
`;

const LogoImage = styled.div<{ imageUrl: string }>`
  width: 150px;
  height: 100px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.lightText};
  font-weight: bold;
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: ${({ theme }) => theme.transitions.default};
  
  ${LogoCard}:hover & {
    transform: scale(1.05);
  }
`;

const LogoName = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  text-align: center;
`;

const FeaturedBadge = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const UploadSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

const FormTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.lightText};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(66, 161, 244, 0.2);
  }
`;

const Checkbox = styled.input`
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

const Logos: React.FC = () => {
  const { logos, addLogo, toggleFeatured, deleteLogo } = useLogos();
  const [newLogo, setNewLogo] = useState({
    name: '',
    imageUrl: '',
    altText: '',
    featured: false,
    website: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewLogo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    // Generate a temporary preview URL for the file
    // In a real application, this would be handled by uploading to a server
    const temporaryUrl = URL.createObjectURL(file);
    setNewLogo(prev => ({
      ...prev,
      imageUrl: temporaryUrl
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would upload the image to a server here
    // and get back a URL to store
    
    // For demo purposes, we'll use the file name to simulate server storage
    let logoUrl = newLogo.imageUrl;
    
    if (selectedFile) {
      // In a real application, this would be the URL returned from the server
      // after uploading the file. For demo, we'll use a path in the public folder
      logoUrl = `/logos/${selectedFile.name}`;
    }
    
    addLogo({
      name: newLogo.name,
      imageUrl: logoUrl || '/logos/Image-Source-PlusPNG.com.png', // Use placeholder if no URL provided
      altText: newLogo.altText || `${newLogo.name} Logo`,
      featured: newLogo.featured,
      website: newLogo.website
    });
    
    // Reset form
    setNewLogo({
      name: '',
      imageUrl: '',
      altText: '',
      featured: false,
      website: ''
    });
    setSelectedFile(null);
  };

  return (
    <LogosPageContainer>
      <Title>Client Logos</Title>
      <Description>
        Manage your client logos here. Featured logos will appear on the home page.
      </Description>
      
      <LogosGrid>
        {logos.map(logo => (
          <LogoCard key={logo.id} featured={logo.featured}>
            <LogoImage imageUrl={logo.imageUrl}>
              {!logo.imageUrl && logo.name}
            </LogoImage>
            <LogoName>{logo.name}</LogoName>
            {logo.website && (
              <a 
                href={logo.website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '0.85rem',
                  color: '#42a1f4',
                  marginTop: '5px',
                  textDecoration: 'none'
                }}
              >
                <i className="fas fa-external-link-alt" style={{ marginRight: '5px' }}></i>
                Visit Website
              </a>
            )}
            
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', width: '100%', justifyContent: 'center' }}>
              <button 
                onClick={() => toggleFeatured(logo.id)}
                style={{
                  padding: '8px 12px',
                  background: logo.featured ? '#f44336' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <i className={logo.featured ? 'fas fa-star-half-alt' : 'fas fa-star'} style={{ marginRight: '5px' }}></i>
                {logo.featured ? 'Unfeature' : 'Feature'}
              </button>
              
              <button 
                onClick={() => deleteLogo(logo.id)}
                style={{
                  padding: '8px 12px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <i className="fas fa-trash-alt" style={{ marginRight: '5px' }}></i>
                Delete
              </button>
            </div>
            
            {logo.featured && <FeaturedBadge>Featured</FeaturedBadge>}
          </LogoCard>
        ))}
      </LogosGrid>
      
      <UploadSection>
        <FormTitle>Add New Logo</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Company Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={newLogo.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Upload Logo Image</Label>
            <FileUploader 
              onFileSelect={handleFileSelect}
              acceptedFileTypes="image/png, image/jpeg, image/webp, image/svg+xml"
              maxFileSize={3 * 1024 * 1024} // 3MB
            />
          </FormGroup>

          <FormGroup>
            <Label>OR Enter Logo URL</Label>
            <Input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={newLogo.imageUrl}
              onChange={handleInputChange}
              placeholder="http://example.com/logo.png"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="altText">Alt Text</Label>
            <Input
              type="text"
              id="altText"
              name="altText"
              value={newLogo.altText}
              onChange={handleInputChange}
              placeholder="Company Logo"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="website">Official Website URL</Label>
            <Input
              type="url"
              id="website"
              name="website"
              value={newLogo.website}
              onChange={handleInputChange}
              placeholder="https://www.example.com/"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>
              <Checkbox
                type="checkbox"
                name="featured"
                checked={newLogo.featured}
                onChange={handleInputChange}
              />
              Feature on Home Page
            </Label>
          </FormGroup>
          
          <SubmitButton type="submit">
            <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
            Add Logo
          </SubmitButton>
        </form>
      </UploadSection>
    </LogosPageContainer>
  );
};

export default Logos;