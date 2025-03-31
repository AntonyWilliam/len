import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.lightText};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(66, 161, 244, 0.2);
  }
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
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightText};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ThankYouMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

const DirectContact = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

const ContactLinks = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
  
  i {
    margin-right: ${({ theme }) => theme.spacing.xs};
    font-size: 1.2em;
  }
`;

// Removed unused Email component

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create formatted email content
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // This will open the user's default email client (Gmail, Outlook, etc.)
    // with the recipient, subject and message body pre-filled
    window.open(`mailto:len.humbird@gmail.com?subject=${subject}&body=${body}`);
    
    // Update the UI to show the thank you message
    setIsSubmitted(true);
  };
  
  const isFormValid = formData.name && formData.email && formData.message;
  
  if (isSubmitted) {
    return (
      <ContactContainer>
        <ThankYouMessage>
          <h2>Thank You!</h2>
          <p>Your message has been sent. I'll get back to you as soon as possible.</p>
        </ThankYouMessage>
      </ContactContainer>
    );
  }
  
  return (
    <ContactContainer>
      <Title>Contact Me</Title>
      <Subtitle>Let's discuss how I can help with your technical writing needs.</Subtitle>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={!isFormValid}>
          Send Message
        </SubmitButton>
      </form>
      
      <DirectContact>
        <h2>Or Contact Me Directly</h2>
        <ContactLinks>          
          <ContactLink href="tel:+15033081999">
            <i className="fas fa-phone"></i>
            503-308-1999 (Cell)
          </ContactLink>
          
          <ContactLink 
            href="https://www.linkedin.com/in/lenhumbird/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
            LinkedIn Profile
          </ContactLink>
        </ContactLinks>
      </DirectContact>
    </ContactContainer>
  );
};

export default Contact;