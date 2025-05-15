import React from 'react';
import '../../../styles/itineraryCSS/TourList.css';

const TourList = ({ tours, onEdit, onDelete }) => {
  return (
    <div className="tour-list">
      {tours.map(tour => (
        <div key={tour.id} className="tour-item">
          <div className="tour-image">
            {tour.image && (
              <img 
                src={`http://localhost:5000${tour.image}`}
                alt={tour.destination}
              />
            )}
          </div>
          
          <div className="tour-info">
            <h3>{tour.destination}</h3>
            <div className="tour-details">
              <p><strong>Khởi hành:</strong> {tour.departure_from}</p>
              <p><strong>Thời gian:</strong> {tour.duration}</p>
            </div>
            <p className="tour-description">{tour.description}</p>
          </div>
          
          <div className="tour-actions">
            <button onClick={() => onEdit(tour)} className="tour-edit-button">
              <i className="bi bi-pencil"></i> Sửa
            </button>
            <button 
              onClick={() => {
                if(window.confirm('Bạn có chắc muốn xóa tour này?')) {
                  onDelete(tour.id);
                }
              }} 
              className="tour-delete-button"
            >
              <i className="bi bi-trash"></i> Xóa
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourList;