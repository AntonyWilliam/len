import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import { LogosProvider } from './context/LogosContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Samples from './pages/Samples';
import About from './pages/About';
import Contact from './pages/Contact';
import Logos from './pages/Logos';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LogosProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/samples" element={<Samples />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/logos" element={<Logos />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </LogosProvider>
    </ThemeProvider>
  );
};

export default App;
