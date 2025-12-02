import React, { useEffect, useState } from 'react';
import { courseApi } from '../services/api';

const Courses = ({ onEnroll }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await courseApi.getAll();
        if (isMounted) {
          setCourses(response?.data || []);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
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

  return (
    <section className="section" style={{background: '#f8fafc'}}>
      <div className="container">
        <h2 className="section-title">All Courses</h2>
        <p className="section-subtitle">
          Enhance your skills with industry-relevant courses and certifications
        </p>
        
        {error && <p className="error-text">{error}</p>}

        <div className="cards-grid">
          {isLoading && (
            <>
              {[1, 2, 3].map((item) => (
                <div key={item} className="card skeleton-card">
                  <div className="skeleton skeleton-badge" />
                  <div className="skeleton skeleton-title" />
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-footer" />
                </div>
              ))}
            </>
          )}

          {!isLoading && courses.length === 0 && !error && (
            <p>No courses found at the moment. Please check back later.</p>
          )}

          {!isLoading &&
            courses.map((course) => (
              <div key={course._id} className="card">
                {course.badge && <div className="card-badge">{course.badge}</div>}
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
  );
};

export default Courses;