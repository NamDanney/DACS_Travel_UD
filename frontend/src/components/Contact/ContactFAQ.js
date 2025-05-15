import React, { useState } from 'react';
import '../../styles/Contact/ContactFAQ.css';

const faqs = [
  {
    id: 1,
    question: "Làm thế nào để đặt tour du lịch?",
    answer: "Bạn có thể đặt tour trực tiếp trên website bằng cách chọn tour mong muốn, chọn ngày và điền thông tin cá nhân. Hoặc liên hệ với chúng tôi qua hotline để được tư vấn chi tiết."
  },
  {
    id: 2,
    question: "Chính sách hủy tour như thế nào?",
    answer: "- Hủy trước 7 ngày: Hoàn 100% tiền cọc\n- Hủy trước 3-7 ngày: Hoàn 50% tiền cọc\n- Hủy dưới 3 ngày: Không hoàn tiền cọc"
  },
  {
    id: 3,
    question: "Tôi có thể thay đổi lịch tour sau khi đặt không?",
    answer: "Có thể thay đổi lịch tour trước 7 ngày khởi hành mà không mất phí. Thay đổi trong vòng 3-7 ngày sẽ tính phí 10% giá tour."
  },
  {
    id: 4,
    question: "Có được đổi/trả vé tour không?",
    answer: "Chúng tôi chấp nhận đổi/trả vé tour theo chính sách hủy tour. Vui lòng liên hệ trực tiếp để được hướng dẫn chi tiết."
  },
  {
    id: 5,
    question: "Phương thức thanh toán nào được chấp nhận?",
    answer: "Chúng tôi chấp nhận thanh toán qua:\n- Chuyển khoản ngân hàng\n- Thẻ tín dụng/ghi nợ\n- Ví điện tử (Momo, ZaloPay)\n- Tiền mặt tại văn phòng"
  }
];

const ContactFAQ = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-header">
          <div className="section-badge">FAQ</div>
          <h2>Câu hỏi thường gặp</h2>
          <p>Tìm câu trả lời nhanh cho những thắc mắc phổ biến nhất</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`faq-item ${activeId === faq.id ? 'active' : ''}`}
              onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  <i className={`bi bi-chevron-${activeId === faq.id ? 'up' : 'down'}`}></i>
                </span>
              </div>
              <div className="faq-answer">
                {faq.answer.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <p>Không tìm thấy câu trả lời bạn cần?</p>
          <a href="#contact-form" className="btn-contact">
            Liên hệ với chúng tôi
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;