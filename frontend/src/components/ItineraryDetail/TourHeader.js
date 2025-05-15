import React from 'react';
import '../../styles/itineraryCSS/TourHeader.css';

const TourHeader = ({ tour }) => {
  return (
    <div className="tour-header">
      <div className="tour-header-image">
        <img 
          src={`http://localhost:5000${tour.image}`}
          alt={tour.destination}
        />
        <div className="tour-header-overlay">
          <div className="tour-header-content">
            <h1>{tour.destination}</h1>
            <div className="tour-basic-info">
              <div className="info-item">
                <i className="bi bi-geo-alt"></i>
                <span>Khởi hành từ: {tour.departure_from}</span>
              </div>
              <div className="info-item">
                <i className="bi bi-clock"></i>
                <span>Thời gian: {tour.duration}</span>
              </div>
              <div className="info-item">
                <i className="bi bi-calendar3"></i>
                <span>Lịch trình: {tour.schedule.length} ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHeader;