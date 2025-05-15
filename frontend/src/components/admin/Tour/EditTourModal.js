import React from 'react';
import TourForm from './TourForm';
import '../../../styles/itineraryCSS/TourModal.css';

const EditTourModal = ({ show, onClose, formData, setFormData, onSubmit, isSubmitting }) => {
  if (!show) return null;

  return (
    <div className="tour-modal-overlay">
      <div className="tour-modal-content">
        <div className="tour-modal-header">
          <h2>Chỉnh Sửa Tour</h2>
          <button onClick={onClose} className="tour-close-button">
            <i className="bi bi-x"></i>
          </button>
        </div>

        <TourForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditTourModal;