import React from 'react';
import '../../styles/itineraryCSS/ReviewsList.css';

const ReviewsList = ({ reviews }) => {
  return (
    <div className="reviews-list">
      <h3>Đánh giá từ khách hàng</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-header">
              <strong>{review.user || 'Ẩn danh'}</strong>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                  />
                ))}
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="no-reviews">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
      )}
    </div>
  );
};

export default ReviewsList;