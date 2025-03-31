import React from 'react';
import styled from 'styled-components';
import { useLogos } from '../context/LogosContext';

const LogosSection = styled.section`
  padding: ${({ theme }) => theme.spacing.lg} 0; /* Reduced from xl */
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px; /* Reduced from 50px */
    background: linear-gradient(to top right, transparent 49%, ${({ theme }) => theme.colors.white} 50%);
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}; /* Reduced from lg */
  position: relative;
  font-size: 1.8rem; /* Reduced from 2rem */
  color: ${({ theme }) => theme.colors.text};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.xs};
    left: 50%;
    transform: translateX(-50%);
    width: 60px; /* Reduced from 80px */
    height: 2px; /* Reduced from 3px */
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const LogosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1100px; /* Reduced from 1200px */
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm}; /* Reduced from xl md */
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 70%; /* Reduced from 80% */
    height: 1px;
    background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.primary}40, transparent);
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.65;
  transition: ${({ theme }) => theme.transitions.default};
  padding: ${({ theme }) => theme.spacing.md}; /* Reduced from lg */
  border-radius: 4px; /* Reduced from 6px */
  margin: ${({ theme }) => theme.spacing.xs}; /* Reduced from sm */
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.subtle};
    transform: translateY(-5px);
  }
  
  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40%;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const Logo = styled.div<{ logoUrl: string }>`
  width: 130px; /* Reduced from 160px */
  height: 90px; /* Reduced from 110px */
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.lightText};
  font-weight: bold;
  background-image: ${({ logoUrl }) => logoUrl ? `url(${logoUrl})` : 'none'};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: grayscale(35%);
  transition: ${({ theme }) => theme.transitions.default};
  
  ${LogoWrapper}:hover & {
    filter: grayscale(0%);
    transform: scale(1.05);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100px; /* Reduced from 120px */
    height: 70px; /* Reduced from 80px */
  }
`;

const LogoName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  text-align: center;
  max-width: 700px; /* Reduced from 800px */
  margin: 0 auto ${({ theme }) => theme.spacing.md}; /* Reduced from lg */
  font-size: 0.95rem; /* Reduced from theme.fontSizes.medium */
  line-height: 1.6; /* Reduced from 1.8 */
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
`;

interface ClientLogosProps {
  title?: string;
  description?: string;
  showHeader?: boolean;
}

const ClientLogos: React.FC<ClientLogosProps> = ({ 
  title = "Trusted By Industry Leaders", 
  description = "I've had the privilege of collaborating with leading organizations across various industries to deliver documentation that meets the highest standards of clarity, usability, and technical accuracy.",
  showHeader = true
}) => {
  const { logos } = useLogos();
  
  // Filter only featured logos for the home page display
  const featuredLogos = logos.filter(logo => logo.featured);
  
  return (
    <LogosSection>
      {showHeader && (
        <>
          <SectionTitle>{title}</SectionTitle>
          <Description>{description}</Description>
        </>
      )}
      <LogosContainer>
        {featuredLogos.map((logo) => (
          <LogoWrapper key={logo.id} as={logo.website ? 'a' : 'div'} href={logo.website} target="_blank" rel="noopener noreferrer">
            {logo.imageUrl ? (
              <Logo logoUrl={logo.imageUrl} aria-label={logo.altText} />
            ) : (
              <Logo logoUrl="">{logo.name}</Logo>
            )}
            <LogoName>
              {logo.name}
              {logo.website && <i className="fas fa-external-link-alt" style={{ fontSize: '0.7em', marginLeft: '5px', opacity: 0.6 }} />}
            </LogoName>
          </LogoWrapper>
        ))}
      </LogosContainer>
    </LogosSection>
  );
};

export default ClientLogos;