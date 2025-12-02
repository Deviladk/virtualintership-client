import React, { useEffect, useState } from 'react';
import { courseApi } from '../services/api';

const Home = ({ onViewChange, onEnroll }) => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [courseError, setCourseError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setIsLoadingCourses(true);
        const response = await courseApi.getAll();
        if (isMounted) {
          setFeaturedCourses((response?.data || []).slice(0, 3));
        }
      } catch (error) {
        if (isMounted) {
          setCourseError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoadingCourses(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatPrice = (value) =>
    typeof value === 'number'
      ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
      : value;

  const internshipCategories = [
    {
      title: "Web Development",
      description: "Frontend, Backend & Full Stack opportunities",
      count: "45+ Positions",
      image: "🌐"
    },
    {
      title: "Android Development", 
      description: "Mobile app development with Kotlin & Java",
      count: "32+ Positions",
      image: "📱"
    },
    {
      title: "Data Science",
      description: "Machine Learning, AI & Data Analysis roles",
      count: "28+ Positions",
      image: "📊"
    },
    {
      title: "Java Programming",
      description: "Enterprise applications & backend development",
      count: "38+ Positions",
      image: "☕"
    }
  ];

  return (
    <div>
      {/* Header Section */}
      <section className="header-section">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>CareerStart</h1>
              <p className="header-subtitle">Virtual internships & short courses</p>
              <p className="header-description">
                Get real project experience — remotely
              </p>
              <p className="header-stats">
                Short internships, mentorship and certificates to take you to the next level.
                <span className="quick-stats">Quick stats: 2000+ interns placed</span>
              </p>
              <button className="btn btn-primary header-cta" onClick={() => onViewChange('courses')}>
                Explore Programs
              </button>
            </div>
            <div className="header-visual">
              <div className="floating-cards">
                <div className="floating-card card-1">🌐 Web Dev</div>
                <div className="floating-card card-2">📱 Android</div>
                <div className="floating-card card-3">📊 Data Science</div>
                <div className="floating-card card-4">☕ Java</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section className="section internships-section">
        <div className="container">
          <h2 className="section-title">Internships We Offer!</h2>
          <p className="section-subtitle">
            Kickstart your career with hands-on experience in various domains
          </p>
          
          <div className="internship-categories-grid">
            {internshipCategories.map((category, index) => (
              <div key={index} className="internship-category-card">
                <div className="category-icon">
                  {category.image}
                </div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <div className="category-meta">
                    <span className="positions-count">{category.count}</span>
                  </div>
                  <button 
                    className="btn btn-primary category-btn" 
                    onClick={() => onViewChange('internships')}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Courses</h2>
          <p className="section-subtitle">
            Enhance your skills with industry-relevant courses and certifications
          </p>
          
          {courseError && <p className="error-text">{courseError}</p>}

          <div className="cards-grid">
            {isLoadingCourses && (
              <div className="card skeleton-card">
                <div className="skeleton skeleton-badge" />
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-footer" />
              </div>
            )}

            {!isLoadingCourses && featuredCourses.length === 0 && !courseError && (
              <p>No courses available right now. Please check back soon!</p>
            )}

            {featuredCourses.map((course) => (
              <div key={course._id} className="card">
                {course.badge && <div className="card-badge">{course.badge}</div>}
                <div className="card-icon">{course.image || '💻'}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="card-meta">
                  <span className="card-duration">⏱️ {course.duration}</span>
                </div>
                <div className="card-price">
                  <span className="original-price">{formatPrice(course.originalPrice)}</span>
                  {formatPrice(course.discountedPrice)}
                </div>
                <button className="btn btn-primary" onClick={() => onEnroll(course)}>
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;