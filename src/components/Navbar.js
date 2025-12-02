import React, { useEffect, useState } from 'react';

const Navbar = ({ currentView, onViewChange, user, onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLink, setActiveLink] = useState('home');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        alert(`Searching for: ${searchQuery}`);
        setShowSearch(false);
        setSearchQuery('');
      }
    }
  };

  const handleNavClick = (view) => {
    setActiveLink(view);
    onViewChange(view);
  };

  useEffect(() => {
    if (currentView && currentView !== activeLink) {
      setActiveLink(currentView);
    }
  }, [currentView, activeLink]);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo-section">
          <a className="logo" onClick={() => handleNavClick('home')}>
            <span className="logo-icon">🚀</span>
            CareerStart
          </a>
        </div>
        
        <ul className="nav-links">
          <li>
            <a 
              className={activeLink === 'home' ? 'active' : ''}
              onClick={() => handleNavClick('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              className={activeLink === 'internships' ? 'active' : ''}
              onClick={() => handleNavClick('internships')}
            >
              Internships
            </a>
          </li>
          <li>
            <a 
              className={activeLink === 'courses' ? 'active' : ''}
              onClick={() => handleNavClick('courses')}
            >
              Courses
            </a>
          </li>
          <li>
            <a 
              className={activeLink === 'contact' ? 'active' : ''}
              onClick={() => setActiveLink('contact')}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          {/* Search Button */}
          <button 
            className="nav-icon-btn search-toggle"
            onClick={() => setShowSearch(!showSearch)}
            title="Search courses"
          >
            <span className="nav-icon">🔍</span>
          </button>

          {/* Theme Toggle */}
          <button 
            className="nav-icon-btn theme-toggle"
            onClick={toggleTheme}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="nav-icon">{darkMode ? '☀️' : '🌙'}</span>
          </button>

          {/* User Section */}
          {user ? (
            <div className="user-section">
              <div className="user-welcome">
                <span className="welcome-text">
                  👋 Welcome, {user.name}
                </span>
              </div>
              <div className="user-dropdown">
                <button className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </button>
                <div className="dropdown-menu">
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item">My Profile</a>
                  <a className="dropdown-item">My Courses</a>
                  <a className="dropdown-item">Settings</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item logout-btn" onClick={onLogout}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="btn btn-primary" 
                onClick={() => handleNavClick('login')}
              >
                Login
              </button>
            </div>
          )}
        </div>

        {/* Search Modal */}
        {showSearch && (
          <div className="search-modal">
            <div className="search-container">
              <div className="search-header">
                <h3>I am looking for online training in</h3>
                <button 
                  className="close-search"
                  onClick={() => setShowSearch(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="search-input-wrapper">
                <div className="search-icon">🎯</div>
                <input
                  type="text"
                  placeholder="Search trainings here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  autoFocus
                />
                <button className="search-submit" onClick={handleSearch}>
                  Search
                </button>
              </div>
              
              {/* Popular Searches */}
              <div className="popular-searches">
                <div className="popular-header">
                  <h4>MOST POPULAR TRAININGS</h4>
                  <span className="count-badge">14</span>
                </div>
                <div className="popular-grid">
                  {[
                    "Web Development with AI",
                    "Programming in Python with AI",
                    "Digital Marketing with AI",
                    "Machine learning with AI",
                    "Advanced Excel with AI",
                    "AutoCAD",
                    "Data Science with AI",
                    "Programming in C and C++ with AI",
                    "Financial Modeling with AI",
                    "Android App Development with AI",
                    "Vibe Coding with Replit",
                    "Artificial Intelligence & ML",
                    "Personal Branding",
                    "AI in Digital Marketing"
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="popular-item"
                      onClick={() => {
                        setSearchQuery(item);
                        handleSearch({ type: 'click' });
                      }}
                    >
                      <span className="item-icon">🔥</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;