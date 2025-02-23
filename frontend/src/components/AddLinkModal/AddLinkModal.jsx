// components/AddLinkModal/AddLinkModal.jsx
import React, { useState } from 'react';
import styles from './AddLinkModal.module.css';

const AddLinkModal = ({ isOpen, onClose, onAdd }) => {
  const [linkType, setLinkType] = useState('link'); // 'link' or 'shop'
  const [linkData, setLinkData] = useState({
    title: '',
    url: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...linkData, type: linkType });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Enter URL</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.tabGroup}>
            <button
              className={`${styles.tab} ${linkType === 'link' ? styles.active : ''}`}
              onClick={() => setLinkType('link')}
            >
              Add Link
            </button>
            <button
              className={`${styles.tab} ${linkType === 'shop' ? styles.active : ''}`}
              onClick={() => setLinkType('shop')}
            >
              Add Shop
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Link title</label>
              <input
                type="text"
                value={linkData.title}
                onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
                placeholder="Enter link title"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>URL</label>
              <input
                type="url"
                value={linkData.url}
                onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                placeholder="Enter URL"
              />
            </div>

            <div className={styles.applications}>
              <p>Applications:</p>
              <div className={styles.appIcons}>
                <img src="/instagram-icon.png" alt="Instagram" />
                <img src="/facebook-icon.png" alt="Facebook" />
                <img src="/youtube-icon.png" alt="YouTube" />
                <img src="/x-icon.png" alt="X" />
              </div>
            </div>

            <button type="submit" className={styles.addButton}>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLinkModal;