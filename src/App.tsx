import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MatchesDashboard from './components/MatchesDashboard';
import MatchDetails from './components/MatchDetails';

function App() {
  return (
    <Router>
      <div className="bg-[#0F0F0F] text-[#FFFFFF] w-full min-h-screen overflow-x-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<MatchesDashboard />} />
          <Route path="/match/:id" element={<MatchDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

