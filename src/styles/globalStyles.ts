import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

// Extend DefaultTheme interface to work with our theme
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 16px;
    line-height: 1.8;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.3;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
    border-bottom: 1px solid #eee;
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transitions.default};
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  em {
    font-family: ${({ theme }) => theme.fonts.accent};
    font-style: italic;
  }

  .container {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.lg} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    html, body {
      font-size: 14px;
    }
    
    .container {
      width: 95%;
      padding: ${({ theme }) => theme.spacing.md} 0;
    }
  }
`;