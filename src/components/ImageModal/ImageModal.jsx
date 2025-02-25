import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ImageModal.module.css";

const ImageModal = ({ image, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (image) {
      setIsVisible(true);
    }
  }, [image]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(() => onClose(), 300);
    }
  };

  if (!image) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${isVisible ? styles.show : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modalContent}>
        <img src={image.urls.regular} alt={image.alt_description} />
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
