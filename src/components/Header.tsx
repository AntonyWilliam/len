import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.headerBg};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} 0;
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 90%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: ${({ theme }) => theme.fontSizes.small};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: 4px;
    transition: ${({ theme }) => theme.transitions.default};
    
    &:hover, &.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <Link to="/">Len Humbird</Link>
        </Logo>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/samples">Samples</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;