export const theme = {
  colors: {
    primary: '#c8a951', // Gold
    secondary: '#a48a36', // Darker gold
    text: '#333333', // Dark grey
    lightText: '#555555', // Medium grey
    background: '#f7f7f7', // Ice/off-white
    backgroundDark: '#eeeeee', // Slightly darker off-white
    white: '#ffffff', 
    black: '#1a1a1a', // Soft black
    headerBg: '#2c2c2c', // Dark charcoal
    accent: '#e9e0cb', // Light gold/beige
    darkAccent: '#4a4a4a', // Darker grey
    border: '#e0e0e0', // Light grey for borders
    
    // Category tag colors
    industry: '#5c6bc0', // Indigo
    industryLight: '#e8eaf6',
    type: '#26a69a', // Teal
    typeLight: '#e0f2f1',
    audience: '#ab47bc', // Purple
    audienceLight: '#f3e5f5',
    year: '#ef5350', // Red
    yearLight: '#ffebee',
  },
  fonts: {
    main: "'Open Sans', sans-serif",
    accent: "'Lora', serif",
  },
  fontSizes: {
    xsmall: '0.75rem', 
    small: '0.85rem',
    regular: '1rem',
    medium: '1.2rem',
    large: '1.5rem',
    xlarge: '2rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    widescreen: '1200px',
  },
  transitions: {
    default: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    slow: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  shadows: {
    default: '0 2px 8px rgba(0, 0, 0, 0.08)',
    hover: '0 6px 15px rgba(0, 0, 0, 0.15)',
    subtle: '0 1px 3px rgba(0, 0, 0, 0.05)',
    gold: '0 3px 10px rgba(200, 169, 81, 0.2)',
  },
};

export type Theme = typeof theme;