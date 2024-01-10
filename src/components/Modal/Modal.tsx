import React from 'react';
import styles from './Modal.module.css';

/**
 * Type definition for the properties accepted by the Modal component.
 */
type ModalProps = {
  onClose: () => void; // Function to call when the modal needs to be closed.
  children: React.ReactNode; // The content to be displayed inside the modal.
};

/**
 * A reusable Modal component for displaying content in a dialog box.
 */
const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalContentRef = React.useRef<HTMLDivElement>(null);

  /**
   * Handles the click event on the modal backdrop.
   * Closes the modal if the click is outside the modal content area.
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event The click event.
   */
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
      onClose(); // Close the modal if the click is outside the modal content.
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent} ref={modalContentRef}>
        {children}
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
