const path = require('path');  // Thêm import này

const { 
  createTour, 
  getAllTours, 
  getTourById, 
  updateTour, 
  deleteTour,
  getToursByLocation
} = require('../models/Tour');

/**
 * Tạo một tour mới
 * @route POST /api/tours
 */
exports.createTour = async (req, res) => {
  try {
    const tourData = req.body;
    // Kiểm tra các trường bắt buộc
    if (!tourData.destination || !tourData.departure_from || !tourData.duration || !tourData.description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: destination, departure_from, duration, description' 
      });
    }

    // Kiểm tra lịch trình và địa điểm
    if (!tourData.schedule || !Array.isArray(tourData.schedule) || tourData.schedule.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tour schedule is required and must be an array' 
      });
    }

    // Kiểm tra từng lịch trình có địa điểm không
    for (const [index, sched] of tourData.schedule.entries()) {
      if (!sched.day || !sched.title) {
        return res.status(400).json({
          success: false,
          message: `Schedule at index ${index} is missing required fields: day, title`
        });
      }
      
      // Đảm bảo locations là một mảng (nếu có)
      if (sched.locations && !Array.isArray(sched.locations)) {
        sched.locations = [];
      }
    }

    const tourId = await createTour(tourData);
    res.status(201).json({ 
      success: true, 
      message: 'Tour created successfully', 
      tourId 
    });
  } catch (error) {
    console.error('Error creating tour:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating tour', 
      error: error.message 
    });
  }
};

/**
 * Lấy tất cả tour
 * @route GET /api/tours
 */
exports.getAllTours = async (req, res) => {
  try {
    const tours = await getAllTours();
    res.status(200).json({ 
      success: true, 
      tours 
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tours', 
      error: error.message 
    });
  }
};

/**
 * Lấy thông tin một tour theo ID
 * @route GET /api/tours/:id
 */
exports.getTourById = async (req, res) => {
  try {
    const tourId = req.params.id;
    
    if (!tourId || isNaN(parseInt(tourId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tour ID'
      });
    }
    
    const tour = await getTourById(tourId);
    if (!tour) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tour not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      tour 
    });
  } catch (error) {
    console.error('Error fetching tour:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tour', 
      error: error.message 
    });
  }
};

/**
 * Cập nhật thông tin một tour
 * @route PUT /api/tours/:id
 */
exports.updateTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tourData = req.body;

    // Kiểm tra xem dữ liệu đã là object hay chưa
    // Nếu là string, thử parse JSON
    if (typeof tourData.highlights === 'string') {
      try {
        tourData.highlights = JSON.parse(tourData.highlights);
      } catch (e) {
        // Nếu không parse được, giữ nguyên giá trị
        console.warn('Failed to parse highlights as JSON:', e);
      }
    }

    if (typeof tourData.schedule === 'string') {
      try {
        tourData.schedule = JSON.parse(tourData.schedule);
      } catch (e) {
        console.warn('Failed to parse schedule as JSON:', e);
      }
    }

    if (typeof tourData.includes === 'string') {
      try {
        tourData.includes = JSON.parse(tourData.includes);
      } catch (e) {
        console.warn('Failed to parse includes as JSON:', e);
      }
    }

    if (typeof tourData.excludes === 'string') {
      try {
        tourData.excludes = JSON.parse(tourData.excludes);
      } catch (e) {
        console.warn('Failed to parse excludes as JSON:', e);
      }
    }

    if (typeof tourData.notes === 'string') {
      try {
        tourData.notes = JSON.parse(tourData.notes);
      } catch (e) {
        console.warn('Failed to parse notes as JSON:', e);
      }
    }

    // Validate required fields
    if (!tourData.destination || !tourData.departure_from || 
        !tourData.duration || !tourData.description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate schedule
    if (!Array.isArray(tourData.schedule) || tourData.schedule.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid schedule format'
      });
    }

    // Handle file upload if exists
    if (req.files && req.files.image) {
      const file = req.files.image;
      const fileName = `${Date.now()}-${file.name}`;
      const uploadPath = path.join(__dirname, '../uploads/tours', fileName);
      
      await file.mv(uploadPath);
      tourData.image = `/uploads/tours/${fileName}`;
    }

    const success = await updateTour(tourId, tourData);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tour updated successfully'
    });
  } catch (error) {
    console.error('Update tour error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating tour',
      error: error.message
    });
  }
};
/**
 * Xóa một tour
 * @route DELETE /api/tours/:id
 */
exports.deleteTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    
    if (!tourId || isNaN(parseInt(tourId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tour ID'
      });
    }
    
    const success = await deleteTour(tourId);
    if (!success) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tour not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Tour deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting tour:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting tour', 
      error: error.message 
    });
  }
};

/**
 * Lấy tất cả tour có chứa một địa điểm cụ thể
 * @route GET /api/tours/location/:id
 */
exports.getToursByLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    
    if (!locationId || isNaN(parseInt(locationId))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid location ID'
      });
    }
    
    const tours = await getToursByLocation(locationId);
    res.status(200).json({ 
      success: true, 
      tours 
    });
  } catch (error) {
    console.error('Error fetching tours by location:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tours by location', 
      error: error.message 
    });
  }
};