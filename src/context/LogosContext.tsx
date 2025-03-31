import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for client logos
export interface ClientLogo {
  id: string;
  name: string;
  imageUrl: string;
  altText: string;
  featured: boolean;
  website?: string;
}

// Sample client logos data with actual logo images and official websites
const initialLogosData: ClientLogo[] = [
  {
    id: 'intel',
    name: 'Intel',
    imageUrl: '/logos/purepng.com-intel-logologobrand-logoiconslogos-251519939644r68ft.png',
    altText: 'Intel Corporation Logo',
    featured: true,
    website: 'https://www.intel.com/'
  },
  {
    id: 'nike',
    name: 'Nike',
    imageUrl: '/logos/Nike-Logo-Transparent-Background.png',
    altText: 'Nike Logo',
    featured: true,
    website: 'https://www.nike.com/'
  },
  {
    id: 'xerox',
    name: 'Xerox',
    imageUrl: '/logos/1024px-Xerox_logo.svg.png',
    altText: 'Xerox Corporation Logo',
    featured: true,
    website: 'https://www.xerox.com/'
  },
  {
    id: 'pacstar',
    name: 'PacStar',
    imageUrl: '/logos/PacStar-Logo-2.png',
    altText: 'PacStar Logo',
    featured: true,
    website: 'https://www.pacstar.com/'
  },
  {
    id: 'quest',
    name: 'Quest Diagnostics',
    imageUrl: '/logos/quest-diagnostics-logo.png',
    altText: 'Quest Diagnostics Logo',
    featured: true,
    website: 'https://www.questdiagnostics.com/'
  },
  {
    id: 'huron',
    name: 'Huron Consulting',
    imageUrl: '/logos/HURN_BIG.png',
    altText: 'Huron Consulting Logo',
    featured: true,
    website: 'https://www.huronconsultinggroup.com/'
  },
  {
    id: 'adventhealth',
    name: 'AdventHealth',
    imageUrl: '/logos/adventhealth-logo-vector.png',
    altText: 'AdventHealth Logo',
    featured: false,
    website: 'https://www.adventhealth.com/'
  }
];

// Create context type
interface LogosContextType {
  logos: ClientLogo[];
  addLogo: (logo: Omit<ClientLogo, 'id'>) => void;
  updateLogo: (id: string, logo: Partial<ClientLogo>) => void;
  deleteLogo: (id: string) => void;
  toggleFeatured: (id: string) => void;
}

// Create context with default values
const LogosContext = createContext<LogosContextType>({
  logos: [],
  addLogo: () => {},
  updateLogo: () => {},
  deleteLogo: () => {},
  toggleFeatured: () => {}
});

// Context provider component
export const LogosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logos, setLogos] = useState<ClientLogo[]>(initialLogosData);

  // Add a new logo
  const addLogo = (logo: Omit<ClientLogo, 'id'>) => {
    const newLogo: ClientLogo = {
      ...logo,
      id: `logo-${Date.now()}`
    };
    setLogos(prev => [...prev, newLogo]);
  };

  // Update an existing logo
  const updateLogo = (id: string, updatedLogo: Partial<ClientLogo>) => {
    setLogos(prev => 
      prev.map(logo => 
        logo.id === id ? { ...logo, ...updatedLogo } : logo
      )
    );
  };

  // Delete a logo
  const deleteLogo = (id: string) => {
    setLogos(prev => prev.filter(logo => logo.id !== id));
  };

  // Toggle featured status
  const toggleFeatured = (id: string) => {
    setLogos(prev => 
      prev.map(logo => 
        logo.id === id ? { ...logo, featured: !logo.featured } : logo
      )
    );
  };

  return (
    <LogosContext.Provider 
      value={{ 
        logos, 
        addLogo, 
        updateLogo, 
        deleteLogo,
        toggleFeatured
      }}
    >
      {children}
    </LogosContext.Provider>
  );
};

// Custom hook to use the logos context
export const useLogos = () => useContext(LogosContext);

export default LogosContext;