import Modal from "react-modal";
import PropTypes from "prop-types";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      {image && (
        <div className={styles.content}>
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Image"}
            className={styles.image}
          />
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>
        </div>
      )}
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
    description: PropTypes.string,
  }),
};

export default ImageModal;
