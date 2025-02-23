// components/PhonePreview/PhonePreview.jsx
import React from 'react';
import { Share2 } from 'lucide-react';
import styles from './PhonePreview.module.css';

const PhonePreview = ({ profile, links }) => {
  const handleShare = () => {
    // Implement share functionality
    console.log('Share clicked');
  };

  return (
    <div className={styles.previewContainer}>
      <button className={styles.shareButton} onClick={handleShare}>
        <Share2 size={16} />
        Share
      </button>
      
      <div className={styles.phoneFrame}>
        <div className={styles.phoneContent}>
          <div className={styles.profileSection}>
            <img 
              src={profile.avatar || '/api/placeholder/100/100'} 
              alt="Profile" 
              className={styles.avatar}
            />
            <h3 className={styles.username}>{profile.username}</h3>
            <p className={styles.bio}>{profile.bio}</p>
          </div>
          
          <div className={styles.linksSection}>
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className={`${styles.linkButton} ${styles[link.type]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
              </a>
            ))}
          </div>
          
          <div className={styles.sparkBranding}>
            🟢 SPARK
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;