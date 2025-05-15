import React from 'react';
import '../../../styles/itineraryCSS/TourForm.css';

const TourForm = ({ formData, setFormData, onSubmit, onCancel, isSubmitting }) => {

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array changes (highlights, includes, excludes, notes)
  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? value : item
      )
    }));
  };

  // Add array item
  const handleAddArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  // Remove array item 
  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev, 
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Handle schedule changes
  const handleScheduleChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.map((day, i) => 
        i === index ? { ...day, [field]: value } : day
      )
    }));
  };

  // Handle schedule activity changes
  const handleScheduleActivityChange = (scheduleIndex, activityIndex, value) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.map((day, i) => {
        if (i === scheduleIndex) {
          const activities = [...day.activities];
          activities[activityIndex] = value;
          return { ...day, activities };
        }
        return day;
      })
    }));
  };

  // Add schedule day
  const handleAddSchedule = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        {
          day: `${prev.schedule.length + 1}`,
          title: '',
          activities: [''],
          locations: []
        }
      ]
    }));
  };

  return (
    <form onSubmit={onSubmit} className="tour-form">
      {/* Basic Information */}
      <div className="tour-form-section">
        <h3>Thông tin cơ bản</h3>
        <div className="tour-form-group">
          <label>Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="tour-form-group">
          <label>Điểm khởi hành</label>
          <input
            type="text"
            name="departure_from"
            value={formData.departure_from}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="tour-form-group">
          <label>Thời gian</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="VD: 3 ngày 2 đêm"
            required
          />
        </div>

        <div className="tour-form-group">
          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="tour-form-group">
          <label>Ảnh tour</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData(prev => ({
              ...prev,
              image: e.target.files[0]
            }))}
          />
        </div>
      </div>

      {/* Highlights Section */}
      <div className="tour-form-section">
        <h3>Điểm nổi bật</h3>
        {formData.highlights.map((highlight, index) => (
          <div key={index} className="tour-array-input">
            <input
              type="text"
              value={highlight}
              onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
              placeholder="Điểm nổi bật của tour"
            />
            <button
              type="button"
              onClick={() => handleRemoveArrayItem('highlights', index)}
              disabled={formData.highlights.length <= 1}
              className="tour-remove-button"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => handleAddArrayItem('highlights')}
          className="tour-add-button"
        >
          Thêm điểm nổi bật
        </button>
      </div>

      {/* Schedule Section */}
      <div className="tour-form-section">
        <h3>Lịch trình</h3>
        {formData.schedule.map((day, scheduleIndex) => (
          <div key={scheduleIndex} className="tour-schedule-item">
            <div className="tour-form-group">
              <label>Ngày</label>
              <input
                type="text"
                value={day.day}
                onChange={(e) => handleScheduleChange(scheduleIndex, 'day', e.target.value)}
              />
            </div>
            
            <div className="tour-form-group">
              <label>Tiêu đề ngày</label>
              <input
                type="text"
                value={day.title}
                onChange={(e) => handleScheduleChange(scheduleIndex, 'title', e.target.value)}
              />
            </div>

            <div className="tour-activities-section">
              <label>Hoạt động</label>
              {day.activities.map((activity, actIndex) => (
                <div key={actIndex} className="tour-activity-input">
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => handleScheduleActivityChange(scheduleIndex, actIndex, e.target.value)}
                    placeholder="Mô tả hoạt động"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newActivities = [...day.activities, ''];
                  handleScheduleChange(scheduleIndex, 'activities', newActivities);
                }}
                className="tour-add-button"
              >
                Thêm hoạt động
              </button>
            </div>
          </div>
        ))}
        <button 
          type="button"
          onClick={handleAddSchedule}
          className="tour-add-button"
        >
          Thêm ngày
        </button>
      </div>

      {/* Action Buttons */}
      <div className="tour-form-actions">
        <button 
          type="button" 
          onClick={onCancel} 
          disabled={isSubmitting}
          className="tour-cancel-button"
        >
          Hủy
        </button>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="tour-submit-button"
        >
          {isSubmitting ? 'Đang xử lý...' : 'Lưu'}
        </button>
      </div>
    </form>
  );
};

export default TourForm;