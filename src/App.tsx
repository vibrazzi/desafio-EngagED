import { useState } from 'react'; // React não é necessário com react-jsx
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './themes/theme';
import Header from './components/Header';
import CharacterList from './components/CharacterList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterDetails from './components/CharacterDetails';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;