import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
`;

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.8;
`;

const List = styled.ul`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: 4px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  font-weight: bold;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }
  
  i {
    margin-right: ${({ theme }) => theme.spacing.sm};
    font-size: 1.2em;
  }
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>About Len Humbird</Title>
      
      <Section>
        <SectionTitle>Professional Background</SectionTitle>
        <Paragraph>
          I am a senior technical writer with over 20 years of experience creating documentation for software, 
          hardware, and business processes. Throughout my career, I've worked with leading technology companies 
          including Intel, Nike, and Xerox, delivering high-quality documentation that helps users understand 
          complex systems and processes.
        </Paragraph>
        <Paragraph>
          My expertise spans a wide range of document types, from user manuals and online help systems to API 
          documentation, process flows, and training materials. I pride myself on my ability to translate 
          complex technical information into clear, concise, and user-friendly content.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>Skills & Expertise</SectionTitle>
        <List>
          <li><strong>Document Types:</strong> User guides, online help, API documentation, process flows, training materials, style guides</li>
          <li><strong>Tools:</strong> Microsoft Word, Adobe FrameMaker, MadCap Flare, DITA, HTML/CSS, Markdown, Git</li>
          <li><strong>Industries:</strong> Software development, hardware manufacturing, financial services, retail, insurance</li>
          <li><strong>Specialties:</strong> Single-sourcing content, localization management, information architecture, audience analysis</li>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>Approach to Technical Writing</SectionTitle>
        <Paragraph>
          My approach to technical writing is user-centered. I believe documentation should be:
        </Paragraph>
        <List>
          <li><strong>Clear and Concise:</strong> Using plain language to explain complex concepts</li>
          <li><strong>Well-Structured:</strong> Organizing information logically with effective navigation</li>
          <li><strong>Task-Oriented:</strong> Focusing on what users need to accomplish</li>
          <li><strong>Visually Effective:</strong> Incorporating diagrams, screenshots, and formatting to enhance understanding</li>
          <li><strong>Accurate and Complete:</strong> Ensuring all information is correct and comprehensive</li>
        </List>
      </Section>
      
      <ButtonContainer>
        <CtaButton to="/samples">View My Work Samples</CtaButton>
      </ButtonContainer>
      
      <SocialLinks>
        <SocialLink 
          href="https://www.linkedin.com/in/lenhumbird/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin-in"></i>
          Connect on LinkedIn
        </SocialLink>
        
        <SocialLink href="mailto:len.humbird@gmail.com">
          <i className="fas fa-envelope"></i>
          len.humbird@gmail.com
        </SocialLink>
        
        <SocialLink href="tel:+15033081999">
          <i className="fas fa-phone"></i>
          503-308-1999
        </SocialLink>
      </SocialLinks>
    </AboutContainer>
  );
};

export default About;