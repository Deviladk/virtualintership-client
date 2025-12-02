import React, { useState } from 'react';

const PaymentForm = ({ course, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: ''
  });

  const formatPrice = (price) =>
    typeof price === 'number'
      ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
      : price;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment Successful! You will receive course details via email.');
    onBack();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-container">
      <h2 className="text-center">Complete Your Enrollment</h2>
      <p className="text-center mb-4">You're enrolling in: <strong>{course?.title}</strong></p>

      <div className="card mb-4">
        <h3>Order Summary</h3>
        <p><strong>Course:</strong> {course?.title}</p>
        <p><strong>Duration:</strong> {course?.duration}</p>
        <p><strong>Amount:</strong> {formatPrice(course?.discountedPrice || course?.price)}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <h4>Select Payment Method</h4>
        <div className="payment-methods">
          <div 
            className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            💳 Credit/Debit Card
          </div>
          <div 
            className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('upi')}
          >
            📱 UPI
          </div>
          <div 
            className={`payment-method ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('netbanking')}
          >
            🏦 Net Banking
          </div>
        </div>

        {paymentMethod === 'card' && (
          <>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </>
        )}

        {paymentMethod === 'upi' && (
          <div className="form-group">
            <label>UPI ID</label>
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              placeholder="yourname@upi"
              required
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
          Pay {formatPrice(course?.discountedPrice || course?.price)}
        </button>
        
        <button type="button" className="btn btn-outline mt-4" onClick={onBack} style={{width: '100%'}}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;