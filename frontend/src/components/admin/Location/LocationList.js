import React from 'react';

const LocationList = ({ locations, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="location-table">
        <thead>
          <tr>
            <th>Tên địa điểm</th>
            <th>Loại</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.title}</td>
              <td>{location.type}</td>
              <td>{location.description}</td>
              <td>
                <button
                  onClick={() => onEdit(location)}
                  className="edit-button"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(location.id)}
                  className="delete-button"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationList;