import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.headerBg};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, 
      ${({ theme }) => theme.colors.primary} 0%, 
      ${({ theme }) => theme.colors.secondary} 100%
    );
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FooterSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  display: inline-flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      transform: translateX(0) scale(1.05);
    }
  }
  
  i {
    margin-right: ${({ theme }) => theme.spacing.sm};
    min-width: 16px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      transform: translateX(0) scale(1.05);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: ${({ theme }) => theme.fontSizes.small};
  opacity: 0.7;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const LogoText = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TagLine = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
  color: rgba(255,255,255,0.8);
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const FooterCTA = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: rgba(255,255,255,0.05);
  border-radius: 8px;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const CTATitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  text-decoration: none;
  margin-top: ${({ theme }) => theme.spacing.sm};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        {/* About/Company section */}
        <FooterSection>
          <FooterLogo>
            <LogoText>Len <span>Humbird</span></LogoText>
          </FooterLogo>
          <TagLine>
            Professional technical writer with over 20 years of experience creating clear, effective documentation for software, hardware, and complex technical systems.
          </TagLine>
          <SocialLinks>
            <SocialIcon 
              href="https://www.linkedin.com/in/lenhumbird/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin-in"></i>
            </SocialIcon>
            <SocialIcon 
              href="mailto:len.humbird@gmail.com" 
              aria-label="Email Contact"
            >
              <i className="fas fa-envelope"></i>
            </SocialIcon>
            <SocialIcon 
              href="tel:+15033081999" 
              aria-label="Phone Contact"
            >
              <i className="fas fa-phone"></i>
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        {/* Quick Links section */}
        <FooterSection>
          <FooterSectionTitle>Quick Links</FooterSectionTitle>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/samples">Samples</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/logos">Client Logos</NavLink>
        </FooterSection>
        
        {/* Contact Information section */}
        <FooterSection>
          <FooterSectionTitle>Contact Information</FooterSectionTitle>
          <ContactLink href="mailto:len.humbird@gmail.com">
            <i className="fas fa-envelope"></i>
            len.humbird@gmail.com
          </ContactLink>
          <ContactLink href="tel:+15033081999">
            <i className="fas fa-phone"></i>
            503-308-1999 (Cell)
          </ContactLink>
          <ContactLink href="https://www.linkedin.com/in/lenhumbird/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
            linkedin.com/in/lenhumbird
          </ContactLink>
          <ContactLink href="#" style={{ cursor: 'default', pointerEvents: 'none' }}>
            <i className="fas fa-map-marker-alt"></i>
            Portland, Oregon
          </ContactLink>
        </FooterSection>
        
        {/* Call to Action section */}
        <FooterSection>
          <FooterSectionTitle>Work With Me</FooterSectionTitle>
          <TagLine>
            Need professional technical documentation for your product or service? Contact me today to discuss your project requirements.
          </TagLine>
          <FooterCTA>
            <CTATitle>Let's Discuss Your Project</CTATitle>
            <CTAButton href="/contact">Get In Touch</CTAButton>
          </FooterCTA>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>© {currentYear} Len Humbird - Technical Documentation Professional. All Rights Reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;