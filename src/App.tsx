import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Routes from './Routes';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes />
      </Router>
    </LanguageProvider>
  );
}

export default App;
