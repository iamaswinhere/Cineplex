
const ContactForm = () => {
  return (
    <div className="contact-form-page">
      <div className="form-container">
        <h2>Contact Me</h2>
        <p>Feel free to connect or drop me a message!</p>

        {/* Social Media Links */}
        <div className="social-links">
          <a
            href="https://www.instagram.com/aasww.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn instagram"
          >
            Instagram
          </a>
          <a
            href="www.linkedin.com/in/aswin-raj-829342237"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn linkedin"
          >
            LinkedIn
          </a>
          <a
            href="https://www.fiverr.com/s/dD8eXB3"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn fiverr"
          >
            Fiverr
          </a>
        </div>

      </div>
    </div>
  );
};

export default ContactForm;