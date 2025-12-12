import React from 'react';
import { Link } from 'react-router-dom';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-[#1D1E2B] rounded-lg border border-[#2A2A2A] p-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          The Sports Hub Documentation
        </h1>
        <p className="text-text-secondary text-lg mb-8">
          Complete guide to using The Sports Hub application
        </p>

        <div className="space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
              Overview
            </h2>
            <p className="text-text-primary mb-4">
              The Sports Hub is a modern, pixel-perfect sports dashboard application that provides 
              real-time match information, live scores, and detailed match analytics. Built as a 
              one-stop destination for sports fans to stay updated with their favorite teams and leagues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-text-primary ml-4">
              <li><strong className="text-brand-secondary">Fixtures Dashboard:</strong> View live and upcoming matches with real-time score updates</li>
              <li><strong className="text-brand-secondary">Live Score Polling:</strong> Automatic score updates every 15 seconds for live matches</li>
              <li><strong className="text-brand-secondary">Match Details View:</strong> Comprehensive match information including head-to-head statistics, timeline/events, and lineups</li>
              <li><strong className="text-brand-secondary">Dark Mode UI:</strong> Beautiful dark-themed interface matching the Figma design</li>
              <li><strong className="text-brand-secondary">Favorites System:</strong> Save and manage favorite matches</li>
              <li><strong className="text-brand-secondary">Date Navigation:</strong> Browse matches by date with intuitive date selector</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
              Getting Started
            </h2>
            <div className="bg-[#1D1E2B] rounded-lg p-6 border border-[#2A2A2A]">
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Installation
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-text-secondary mb-2">1. Clone the repository:</p>
                  <code className="block bg-[#181921] p-3 rounded text-brand-secondary font-mono text-sm">
                    git clone https://github.com/tinsaye-simeneh/sp-hub.git
                  </code>
                </div>
                <div>
                  <p className="text-text-secondary mb-2">2. Install dependencies:</p>
                  <code className="block bg-[#181921] p-3 rounded text-brand-secondary font-mono text-sm">
                    npm install
                  </code>
                </div>
                <div>
                  <p className="text-text-secondary mb-2">3. Start the development server:</p>
                  <code className="block bg-[#181921] p-3 rounded text-brand-secondary font-mono text-sm">
                    npm run dev
                  </code>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
              API Integration
            </h2>
            <p className="text-text-primary mb-4">
              This application uses <strong className="text-brand-secondary">The SportsDB API</strong> for fetching match data.
            </p>
            <div className="bg-[#1D1E2B] rounded-lg p-6 border border-[#2A2A2A]">
              <ul className="space-y-3 text-text-primary">
                <li>
                  <strong className="text-brand-secondary">Base URL:</strong>{' '}
                  <code className="text-text-secondary">https://www.thesportsdb.com/api/v1/json/3</code>
                </li>
                <li>
                  <strong className="text-brand-secondary">Default League:</strong> Premier League (ID: 4328)
                </li>
                <li>
                  <strong className="text-brand-secondary">Polling Interval:</strong> 15 seconds for live matches
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
              Application Routes
            </h2>
            <div className="bg-[#1D1E2B] rounded-lg p-6 border border-[#2A2A2A]">
              <ul className="space-y-3 text-text-primary">
                <li>
                  <strong className="text-brand-secondary">Dashboard:</strong>{' '}
                  <Link to="/" className="text-brand-secondary hover:underline">/</Link> - Main fixtures view
                </li>
                <li>
                  <strong className="text-brand-secondary">Match Details:</strong>{' '}
                  <code className="text-text-secondary">/match/:id</code> - Detailed match view with timeline and events
                </li>
                <li>
                  <strong className="text-brand-secondary">Documentation:</strong>{' '}
                  <Link to="/docs" className="text-brand-secondary hover:underline">/docs</Link> - This documentation page
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
              Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1D1E2B] rounded-lg p-4 border border-[#2A2A2A]">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Frontend</h3>
                <ul className="space-y-1 text-text-secondary text-sm">
                  <li>• React 19.2.1</li>
                  <li>• TypeScript 5.9.3</li>
                  <li>• Vite 7.2.7</li>
                  <li>• React Router DOM 7.10.1</li>
                </ul>
              </div>
              <div className="bg-[#1D1E2B] rounded-lg p-4 border border-[#2A2A2A]">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Styling</h3>
                <ul className="space-y-1 text-text-secondary text-sm">
                  <li>• Tailwind CSS 4.1.17</li>
                  <li>• DaisyUI 5.5.11</li>
                  <li>• Custom Theme System</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
              Project Structure
            </h2>
            <div className="bg-[#1D1E2B] rounded-lg p-6 border border-[#2A2A2A]">
              <pre className="text-text-secondary text-sm overflow-x-auto">
{`sp-hub/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API service layer
│   ├── constants/      # App constants
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── data/           # Mock data
├── public/             # Static assets
└── dist/               # Production build`}
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
              Deployment
            </h2>
            <div className="bg-[#1D1E2B] rounded-lg p-6 border border-[#2A2A2A]">
              <p className="text-text-primary mb-4">
                The application is deployed on <strong className="text-brand-secondary">Vercel</strong> and is available at:
              </p>
              <a 
                href="https://sp-hub.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-secondary hover:underline text-lg font-semibold"
              >
                https://sp-hub.vercel.app
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
              Useful Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://github.com/tinsaye-simeneh/sp-hub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1D1E2B] rounded-lg p-4 border border-[#2A2A2A] hover:border-brand-secondary transition-colors"
              >
                <h3 className="text-lg font-semibold text-brand-secondary mb-2">GitHub Repository</h3>
                <p className="text-text-secondary text-sm">View source code and contribute</p>
              </a>
              <a 
                href="https://www.thesportsdb.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1D1E2B] rounded-lg p-4 border border-[#2A2A2A] hover:border-brand-secondary transition-colors"
              >
                <h3 className="text-lg font-semibold text-brand-secondary mb-2">The SportsDB API</h3>
                <p className="text-text-secondary text-sm">API documentation and resources</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;

