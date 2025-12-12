import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import MatchesDashboard from './components/MatchesDashboard';
import MatchDetails from './components/MatchDetails';
import Documentation from './components/Documentation';

function AppContent() {
  const location = useLocation();
  const isDocsPage = location.pathname === '/docs';

  return (
    <div className="bg-[#0F0F0F] text-[#FFFFFF] w-full min-h-screen overflow-x-hidden">
      {!isDocsPage && <Header />}
      <Routes>
        <Route path="/" element={<MatchesDashboard />} />
        <Route path="/match/:id" element={<MatchDetails />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

