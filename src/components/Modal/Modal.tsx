import React, { useEffect } from 'react';
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
 * This component handles closing on outside click and escape key press.
 * It sets focus on the modal content when rendered for better keyboard navigation.
 */
const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalContentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the modal content on render for better accessibility.
    modalContentRef.current?.focus();

    // Function to handle escape key press to close the modal.
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener for escape key press.
    document.addEventListener('keydown', handleEscape);

    // Clean up the event listener on component unmount.
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

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
    <div
      className={styles.modalBackdrop}
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'
    >
      <div className={styles.modalContent} ref={modalContentRef} tabIndex={-1}>
        {children}
        <button onClick={onClose} className={styles.closeButton} aria-label='Close modal'>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
