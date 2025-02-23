// pages/Links/LinksPage.jsx
import React, { useState } from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import PhonePreview from '../../components/PhonePreview/PhonePreview';
import AddLinkModal from '../../components/AddLinkModal/AddLinkModal';
import styles from './LinksPage.module.css';


const LinksPage = () => {

  const [profile, setProfile] = useState({
    username: '@opopo_08',
    avatar: '/api/placeholder/100/100',
    bio: ''
  });

  console.log("links page")
  const [links, setLinks] = useState([
    { type: 'youtube', title: 'Latest YouTube Video', url: '' },
    { type: 'instagram', title: 'Latest Instagram reel', url: '' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLink = (newLink) => {
    setLinks([...links, newLink]);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Hi, Jenny Wilson!</h1>
            <p>Congratulations, You get a great response today.</p>
          </div>

          <div className={styles.editor}>
            <section className={styles.profileSection}>
              <h2>Profile</h2>
              <div className={styles.avatarUpload}>
                <img 
                  src={profile.avatar} 
                  alt="Profile" 
                  className={styles.avatar}
                />
                <button className={styles.uploadButton}>
                  Pick an image
                </button>
              </div>
              <input
                type="text"
                placeholder="Profile Title"
                className={styles.input}
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              />
              <textarea
                placeholder="Bio"
                className={styles.textarea}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </section>

            <section className={styles.linksSection}>
              {links.map((link, index) => (
                <div key={index} className={styles.linkItem}>
                  <div className={styles.linkIcon}>
                    {link.type === 'youtube' ? '📺' : '📸'}
                  </div>
                  <input
                    type="text"
                    value={link.title}
                    className={styles.linkInput}
                    onChange={(e) => {
                      const newLinks = [...links];
                      newLinks[index].title = e.target.value;
                      setLinks(newLinks);
                    }}
                  />
                </div>
              ))}
              <button 
                className={styles.addButton}
                onClick={() => setIsModalOpen(true)}
              >
                + Add
              </button>
            </section>
          </div>
        </div>

        <PhonePreview profile={profile} links={links} />
        
        <AddLinkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddLink}
        />
      </div>
    </>
  );
};

export default LinksPage;