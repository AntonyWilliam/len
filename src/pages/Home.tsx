import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ClientLogos from '../components/ClientLogos';

const HomeContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.black} 0%, ${({ theme }) => theme.colors.darkAccent} 100%);
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing.lg} 0 ${theme.spacing.lg}`}; /* Reduced from xl */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to bottom right, transparent 49%, ${({ theme }) => theme.colors.white} 50%);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.primary}10,
      ${({ theme }) => theme.colors.primary}10 2px,
      transparent 2px,
      transparent 10px
    );
    opacity: 0.05;
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.spacing.lg}`};
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem; /* Reduced from 3rem */
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem; /* Reduced from 2.2rem */
  }
`;

const Subtitle = styled.h2`
  font-size: 1.3rem; /* More specific size instead of theme.fontSizes.large */
  margin-bottom: ${({ theme }) => theme.spacing.md}; /* Reduced from lg */
  font-weight: 400;
  opacity: 0.9;
`;

const Description = styled.p`
  font-size: 0.95rem; /* Reduced from theme.fontSizes.medium */
  max-width: 700px; /* Reduced from 800px */
  margin: 0 auto;
  line-height: 1.6; /* Reduced from 1.8 */
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionDescription = styled(Description)`
  text-align: center;
  opacity: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing.lg}; /* Reduced from xl */
`;

const ContentSection = styled.section`
  max-width: 1100px; /* Reduced from 1200px */
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`}; /* Reduced from xl lg */
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
    height: 3px; /* Reduced from 4px */
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

// These styled components are no longer used after refactoring to minimalist design

// Minimalist Section Components
const MinimalistSection = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing.lg} 0 ${theme.spacing.lg}`}; /* Reduced from xl */
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.primary}30, transparent);
  }
`;

const ServicesOverview = styled.div`
  max-width: 1100px; /* Reduced from 1200px */
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md}; /* Reduced from lg */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg}; /* Reduced from xl */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md}; /* Reduced from lg */
  }
`;

const ServiceIntro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MinimalSectionTitle = styled.h2`
  font-size: 1.7rem; /* Reduced from 2rem */
  margin-bottom: ${({ theme }) => theme.spacing.sm}; /* Reduced from md */
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px; /* Reduced from -10px */
    left: 0;
    width: 50px; /* Reduced from 60px */
    height: 2px; /* Reduced from 3px */
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const MinimalDescription = styled.p`
  font-size: 0.95rem; /* Reduced from theme.fontSizes.medium */
  line-height: 1.6; /* Reduced from 1.8 */
  margin-bottom: ${({ theme }) => theme.spacing.md}; /* Reduced from lg */
  color: ${({ theme }) => theme.colors.text};
`;

const ServicesMinimalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md}; /* Reduced from lg */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

// Define a styled component reference for later use in hover styles
const ServiceMinimalBase = styled.div``;

const ServiceMinimal = styled(ServiceMinimalBase)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}; /* Reduced from md */
  padding: ${({ theme }) => theme.spacing.sm}; /* Reduced from md */
  border-radius: 6px; /* Reduced from 8px */
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
  }
`;

const ServiceMinimalIcon = styled.div`
  width: 40px; /* Reduced from 50px */
  height: 40px; /* Reduced from 50px */
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem; /* Reduced from 1.2rem */
  flex-shrink: 0;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  transition: ${({ theme }) => theme.transitions.default};
  
  ${ServiceMinimal}:hover & {
    transform: scale(1.05);
  }
`;

const ServiceMinimalName = styled.h3`
  margin: 0;
  font-size: 0.95rem; /* Reduced from theme.fontSizes.medium */
  color: ${({ theme }) => theme.colors.text};
`;

const MinimalCta = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`}; /* Reduced from sm lg */
  border-radius: 3px;
  text-decoration: none;
  font-weight: bold;
  transition: ${({ theme }) => theme.transitions.default};
  margin-top: ${({ theme }) => theme.spacing.sm}; /* Reduced from md */
  align-self: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem; /* Added smaller font size */
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`}; /* Reduced from sm lg */
  border-radius: 3px;
  text-decoration: none;
  font-weight: bold;
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme }) => theme.shadows.gold};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem; /* Added smaller font size */
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

const PrimaryCta = styled(CtaButton)`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`}; /* Reduced from md xl */
  font-size: 0.95rem; /* Reduced from theme.fontSizes.medium */
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${({ theme }) => theme.spacing.md}; /* Reduced from lg */
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.gold};
  
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Not used after refactoring

const BackgroundCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background-color: white;
`;

const Circle1 = styled(BackgroundCircle)`
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
`;

const Circle2 = styled(BackgroundCircle)`
  width: 200px;
  height: 200px;
  bottom: -50px;
  right: 10%;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <Circle1 />
        <Circle2 />
        <HeroContent>
          <Title>Technical Writing Expertise</Title>
          <Subtitle>Len Humbird, Senior Technical Writer</Subtitle>
          <Description>
            Clear, concise, and effective documentation for your software, hardware, and business processes.
            With over 20 years of experience, I deliver high-quality technical content that enhances user experience
            and supports your business goals.
          </Description>
          <PrimaryCta to="/samples">View My Work</PrimaryCta>
        </HeroContent>
      </HeroSection>
      
      {/* Minimalist Services Section */}
      <MinimalistSection>
        <ServicesOverview>
          <ServiceIntro>
            <MinimalSectionTitle>My Services</MinimalSectionTitle>
            <MinimalDescription>
              From user guides to API documentation, I deliver clear and effective technical content that
              meets your specific needs. Each project is approached with attention to detail, audience focus,
              and industry best practices.
            </MinimalDescription>
            <MinimalCta to="/contact">Let's Work Together</MinimalCta>
          </ServiceIntro>
          
          <ServicesMinimalGrid>
            <ServiceMinimal>
              <ServiceMinimalIcon><i className="fas fa-book"></i></ServiceMinimalIcon>
              <ServiceMinimalName>User Guides & Manuals</ServiceMinimalName>
            </ServiceMinimal>
            
            <ServiceMinimal>
              <ServiceMinimalIcon><i className="fas fa-question-circle"></i></ServiceMinimalIcon>
              <ServiceMinimalName>Online Help Systems</ServiceMinimalName>
            </ServiceMinimal>
            
            <ServiceMinimal>
              <ServiceMinimalIcon><i className="fas fa-code"></i></ServiceMinimalIcon>
              <ServiceMinimalName>API Documentation</ServiceMinimalName>
            </ServiceMinimal>
            
            <ServiceMinimal>
              <ServiceMinimalIcon><i className="fas fa-project-diagram"></i></ServiceMinimalIcon>
              <ServiceMinimalName>Process Flows & Diagrams</ServiceMinimalName>
            </ServiceMinimal>
            
            <ServiceMinimal>
              <ServiceMinimalIcon><i className="fas fa-chalkboard-teacher"></i></ServiceMinimalIcon>
              <ServiceMinimalName>Training Materials</ServiceMinimalName>
            </ServiceMinimal>
            
            <ServiceMinimal>
              <ServiceMinimalIcon><i className="fas fa-edit"></i></ServiceMinimalIcon>
              <ServiceMinimalName>Style Guides</ServiceMinimalName>
            </ServiceMinimal>
          </ServicesMinimalGrid>
        </ServicesOverview>
      </MinimalistSection>
      
      {/* Client Logos Section */}
      <ContentSection>
        <SectionTitle>Trusted By Industry Leaders</SectionTitle>
        <SectionDescription>
          I've had the privilege of collaborating with leading organizations across various industries
          to deliver documentation that meets the highest standards of clarity, usability, and technical accuracy.
        </SectionDescription>
        <ClientLogos showHeader={false} />
      </ContentSection>
    </HomeContainer>
  );
};

export default Home;