import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTourModal from '../../components/admin/Tour/AddTourModal';
import EditTourModal from '../../components/admin/Tour/EditTourModal';
// import TourForm from '../../components/admin/Tour/TourForm';
import TourList from '../../components/admin/Tour/TourList';

import '../../styles/itineraryCSS/TourManagement.css';

const TourManagement = () => {
  // State management
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  // Initial form data
  const initialFormData = {
    destination: '',
    departure_from: '',
    duration: '',
    description: '',
    image: null,
    highlights: [''],
    schedule: [{
      day: '1',
      title: '',
      activities: [''],
      locations: []
    }],
    includes: [''],
    excludes: [''],
    notes: ['']
  };

  const [formData, setFormData] = useState(initialFormData);

  // Fetch tours on component mount
  useEffect(() => {
    fetchTours();
  }, []);

  // Fetch tours function
  const fetchTours = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tours');
      setTours(response.data.tours);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setError('Could not fetch tours');
      setLoading(false);
    }
  };

  // Add tour handler
  const handleAddTour = async (e) => {
    e.preventDefault();
    try {
      const tourFormData = new FormData();
      
      // Add basic fields
      Object.keys(formData).forEach(key => {
        if (key !== 'image') {
          tourFormData.append(key, JSON.stringify(formData[key]));
        }
      });

      // Add image if exists
      if (formData.image instanceof File) {
        tourFormData.append('image', formData.image);
      }

      const response = await axios.post(
        'http://localhost:5000/api/tours',
        tourFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success('Tour added successfully');
        setShowAddModal(false);
        await fetchTours();
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error('Add tour error:', error);
      toast.error(error.response?.data?.message || 'Error adding tour');
    }
  };

  // Edit tour handler
  // Edit tour handler
const handleEditTour = async (e) => {
  e.preventDefault();
  try {
    const tourFormData = new FormData();
    
    // Add basic fields
    tourFormData.append('destination', formData.destination);
    tourFormData.append('departure_from', formData.departure_from);
    tourFormData.append('duration', formData.duration);
    tourFormData.append('description', formData.description);

    // Handle arrays - make sure to stringify arrays before sending
    tourFormData.append('highlights', JSON.stringify(
      formData.highlights.filter(h => h.trim())
    ));

    // Make sure schedule object is complete and properly structured
    const cleanedSchedule = formData.schedule.map(s => ({
      day: s.day,
      title: s.title || '',
      activities: Array.isArray(s.activities) ? s.activities.filter(a => a.trim()) : [],
      locations: Array.isArray(s.locations) ? s.locations : []
    }));
    
    tourFormData.append('schedule', JSON.stringify(cleanedSchedule));
    
    tourFormData.append('includes', JSON.stringify(
      formData.includes.filter(i => i.trim())
    ));
    
    tourFormData.append('excludes', JSON.stringify(
      formData.excludes.filter(e => e.trim())
    ));
    
    tourFormData.append('notes', JSON.stringify(
      formData.notes.filter(n => n.trim())
    ));

    // Handle image if changed
    if (formData.image instanceof File) {
      tourFormData.append('image', formData.image);
    }

    // Log form data (for debugging)
    console.log('Sending form data:', {
      destination: formData.destination,
      departure_from: formData.departure_from,
      schedule: cleanedSchedule
    });

    const response = await axios.put(
      `http://localhost:5000/api/tours/${selectedTour.id}`,
      tourFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (response.data.success) {
      toast.success('Cập nhật tour thành công');
      setShowEditModal(false);
      await fetchTours();
      setSelectedTour(null);
    }
  } catch (error) {
    console.error('Edit tour error:', error);
    toast.error(error.response?.data?.message || 'Lỗi khi cập nhật tour');
  }
};
  // Delete tour handler
  const handleDeleteTour = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    
    try {
      const response = await axios.delete(`http://localhost:5000/api/tours/${id}`);
      
      if (response.data.success) {
        toast.success('Tour deleted successfully');
        await fetchTours();
      }
    } catch (error) {
      console.error('Delete tour error:', error);
      toast.error(error.response?.data?.message || 'Error deleting tour');
    }
  };
  return (
    <div className="tour-management">
      <div className="tour-header-wrapper">
        <h1>Quản lý Tour</h1>
        <button onClick={() => setShowAddModal(true)} className="add-button">
          <i className="bi bi-plus-circle"></i> Thêm Tour mới
        </button>
      </div>
  
      {loading ? (
        <div className="loading-state">Đang tải...</div>
      ) : error ? (
        <div className="error-state">Lỗi: {error}</div>
      ) : (
        <TourList
          tours={tours}
          onEdit={(tour) => {
            setSelectedTour(tour);
            setFormData({...tour, image: null});
            setShowEditModal(true);
          }}
          onDelete={handleDeleteTour}
        />
      )}
  
      <AddTourModal
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData(initialFormData);
        }}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAddTour}
      />
  
      <EditTourModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTour(null);
          setFormData(initialFormData);
        }}
        formData={formData}
        setFormData={setFormData}
        selectedTour={selectedTour}
        onSubmit={handleEditTour}
      />
  
      <ToastContainer />
    </div>
  );

};


export default TourManagement;