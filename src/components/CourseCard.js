import React from 'react';

const Courses = ({ onEnroll }) => {
  const courses = [
    {
      id: 1,
      title: "Advanced Python Programming",
      description: "Master Python with advanced concepts and real projects",
      duration: "6 Weeks",
      originalPrice: "₹4,999",
      discountedPrice: "₹2,999",
      badge: "Bestseller"
    },
    {
      id: 2,
      title: "React & Node.js Full Course",
      description: "Complete full-stack development with modern frameworks",
      duration: "8 Weeks",
      originalPrice: "₹6,999",
      discountedPrice: "₹3,999",
      badge: "Popular"
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      description: "Ace your coding interviews with DSA mastery",
      duration: "10 Weeks",
      originalPrice: "₹5,999",
      discountedPrice: "₹3,499",
      badge: "Essential"
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      description: "Learn design principles and tools like Figma",
      duration: "6 Weeks",
      originalPrice: "₹4,499",
      discountedPrice: "₹2,499",
      badge: "Hot"
    }
  ];

  return (
    <section className="section" style={{background: '#f8fafc'}}>
      <div className="container">
        <h2 className="section-title">Premium Courses</h2>
        <p className="section-subtitle">
          Enhance your skills with industry-relevant courses and certifications
        </p>
        
        <div className="cards-grid">
          {courses.map(course => (
            <div key={course.id} className="card">
              {course.badge && <div className="card-badge">{course.badge}</div>}
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="card-meta">
                <span className="card-duration">⏱️ {course.duration}</span>
              </div>
              <div className="card-price">
                <span className="original-price">{course.originalPrice}</span>
                {course.discountedPrice}
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

export default CourseCard;