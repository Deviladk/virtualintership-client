import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import PaymentForm from './components/PaymentForm';
import Courses from './pages/Courses';
import Home from './pages/Home';
import { authApi, clearToken } from './services/api';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      try {
        const storedUser = window.localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const token = window.localStorage.getItem('token');
        if (token) {
          const response = await authApi.me();
          if (isMounted && response?.user) {
            setUser(response.user);
            window.localStorage.setItem('user', JSON.stringify(response.user));
          }
        }
      } catch (error) {
        console.error('Unable to restore session', error);
        clearToken();
        window.localStorage.removeItem('user');
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAuthSuccess = ({ user: userData }) => {
    setUser(userData);
    window.localStorage.setItem('user', JSON.stringify(userData));
    setCurrentView('home');
    alert(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    clearToken();
    window.localStorage.removeItem('user');
    setUser(null);
    setCurrentView('home');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <Login onAuthSuccess={handleAuthSuccess} onBack={() => setCurrentView('home')} />;
      case 'payment':
        return <PaymentForm course={selectedCourse} onBack={() => setCurrentView('home')} />;
      case 'courses':
        return <Courses onEnroll={(course) => {
          setSelectedCourse(course);
          setCurrentView('payment');
        }} />;
      default:
        return <Home onViewChange={setCurrentView} onEnroll={(course) => {
          setSelectedCourse(course);
          setCurrentView('payment');
        }} />;
    }
  };

  if (isInitializing) {
    return (
      <div className="App">
        <main className="loading-state">
          <p>Preparing your experience...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;