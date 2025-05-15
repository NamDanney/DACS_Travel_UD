import React from "react";
import '../../styles/About/AboutTeam.css';
import avatar1 from '../../assets/images/avatar-1.jpg';
import avatar2 from '../../assets/images/avatar-2.jpg';
import avatar3 from '../../assets/images/avatar-3.jpg';

const team = [
  {
    name: "Nguyễn Văn A",
    role: "Founder & CEO",
    img: avatar1,
    quote: "Du lịch là hành trình của cảm xúc và khám phá.",
    socials: {
      facebook: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    name: "Trần Thị B",
    role: "Lead Designer",
    img: avatar2,
    quote: "Mỗi chuyến đi là một câu chuyện mới.",
    socials: {
      facebook: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    name: "Lê Văn C",
    role: "Travel Expert",
    img: avatar3,
    quote: "Khám phá Phú Yên là khám phá chính mình.",
    socials: {
      facebook: "#",
      linkedin: "#",
      instagram: "#"
    }
  }
];

const AboutTeam = () => (
  <section className="aboutteam-modern-section">
    <div className="container">
      <div className="aboutteam-header text-center">
        <span className="aboutteam-badge">Đội ngũ sáng tạo</span>
        <h2 className="aboutteam-title">
          Gặp gỡ <span className="highlight">Team Phú Yên Travel</span>
        </h2>
        <p className="aboutteam-desc">
          Đội ngũ trẻ trung, nhiệt huyết và đầy sáng tạo – luôn đồng hành cùng bạn trên mọi hành trình.
        </p>
      </div>
      <div className="aboutteam-grid">
        {team.map((member, idx) => (
          <div className="aboutteam-card" key={idx}>
            <div className="aboutteam-avatar-wrap">
              <img src={member.img} alt={member.name} className="aboutteam-avatar" />
              <div className="aboutteam-socials">
                <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
            <div className="aboutteam-info">
              <h3 className="aboutteam-name">{member.name}</h3>
              <span className="aboutteam-role">{member.role}</span>
              <blockquote className="aboutteam-quote">
                <i className="bi bi-quote"></i>
                <span>{member.quote}</span>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
      <div className="aboutteam-cta text-center">
        <h3>Bạn muốn đồng hành cùng chúng tôi?</h3>
        <a href="#careers" className="aboutteam-btn">
          Gia nhập team <i className="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>
);

export default AboutTeam;