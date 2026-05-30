import React, { useState } from 'react';
import { Sprout, LayoutGrid, ArrowRight } from 'lucide-react';

function LandingPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('Solutions');

  const navItems = ['Solutions', 'Support'];

  return (
    <div className="landing-page">
      {/* Floating Navbar */}
      <header className="navbar-wrapper">
        <nav className="navbar" aria-label="Main Navigation">
          <a href="#" className="logo" id="logo-link">
            <Sprout size={24} strokeWidth={2.5} />
            <span>AgriTech</span>
          </a>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`nav-link ${activeTab === item ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item);
                  }}
                  id={`nav-link-${item.toLowerCase()}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="#login" className="btn-link" id="nav-login-btn">Login</a>
            <button className="btn-primary" id="nav-get-started-btn" onClick={() => onNavigate('gap-detector')}>Get Started</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section className="hero" id="hero-section">
          <div className="container hero-content">
            <h1 className="hero-title" id="main-hero-heading">
              Cultivating Insights through <em>Smart Monitoring</em>
            </h1>
            <p className="hero-subtitle" id="main-hero-subheading">
              Harness advanced satellite imagery and computer vision to monitor plantation health with sub-meter accuracy.
            </p>

            {/* Features Cards Grid */}
            <div className="cards-grid">
              {/* Weed Detector Card */}
              <div className="glass-card" id="card-weed-detector">
                <div className="card-icon-container">
                  <Sprout size={24} strokeWidth={2} />
                </div>
                <h2 className="card-title">Weed Detector</h2>
                <p className="card-description">
                  ML based identification and mapping of weed species to optimize herbicide application and crop health.
                </p>
                <a
                  href="#weed-tool"
                  className="card-link"
                  id="link-weed-tool"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('weed-detector');
                  }}
                >
                  <span>Open Tool</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Gap Detector Card */}
              <div className="glass-card" id="card-gap-detector">
                <div className="card-icon-container">
                  <LayoutGrid size={24} strokeWidth={2} />
                </div>
                <h2 className="card-title">Gap Detector</h2>
                <p className="card-description">
                  Precision detection of plantation gaps and missing plants from aerial imagery to ensure maximum land utilization.
                </p>
                <a
                  href="#gap-tool"
                  className="card-link"
                  id="link-gap-tool"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('gap-detector');
                  }}
                >
                  <span>Open Tool</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section" id="cta-section">
          <div className="container">
            <div className="cta-card" id="cta-yield-card">
              <h2 className="cta-title" id="cta-heading">Watch the website walkthrough</h2>
              <p className="cta-subtitle">
                Join us to scale your yield
              </p>
              <div className="cta-actions">
                <button className="btn-primary" id="btn-cta-demo">Demo</button>
                <button className="btn-secondary" id="btn-cta-explore" onClick={() => onNavigate('gap-detector')}>Explore Platform</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" id="main-footer">
        <div className="container footer-content">
          <div className="footer-logo-section">
            <a href="#" className="footer-logo" id="footer-logo-link">AgriTech</a>
            <p className="footer-description">Precision analytics for the next green revolution.</p>
          </div>

          <ul className="footer-links">
            <li><a href="#privacy" className="footer-link" id="link-privacy">Privacy</a></li>
            <li><a href="#terms" className="footer-link" id="link-terms">Terms</a></li>
          </ul>

          <p className="footer-copyright" id="footer-copyright-text">

          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
