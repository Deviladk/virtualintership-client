import React from 'react';

const Internships = ({ onEnroll }) => {
  const internships = [
    {
      id: 1,
      title: "Full Stack Development",
      description: "Build real-world web applications using MERN stack",
      duration: "8 Weeks",
      price: "Free",
      badge: "Popular"
    },
    {
      id: 2,
      title: "Data Science",
      description: "Learn machine learning and data analysis with Python",
      duration: "12 Weeks",
      price: "Free",
      badge: "Hot"
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Create cross-platform apps with React Native",
      duration: "6 Weeks",
      price: "Free",
      badge: "New"
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Master SEO, social media, and content marketing",
      duration: "4 Weeks",
      price: "Free",
      badge: "Trending"
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Featured Internships</h2>
        <p className="section-subtitle">
          Kickstart your career with hands-on experience and industry recognition
        </p>
        
        <div className="cards-grid">
          {internships.map(internship => (
            <div key={internship.id} className="card">
              {internship.badge && <div className="card-badge">{internship.badge}</div>}
              <h3>{internship.title}</h3>
              <p>{internship.description}</p>
              <div className="card-meta">
                <span className="card-duration">⏱️ {internship.duration}</span>
              </div>
              <div className="card-price">{internship.price}</div>
              <button className="btn btn-primary" onClick={() => onEnroll(internship)}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternshipCard;