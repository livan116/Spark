// OnboardingForm.jsx
import React, { useState } from 'react';
import styles from './OnboardingForm.module.css';
import image from "../../assets/login.png"
import spark from "../../assets/spark.png"
const categories = [
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'creative', label: 'Creative', icon: '🎨' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎵' },
  { id: 'fashion', label: 'Fashion & Beauty', icon: '👗' },
  { id: 'food', label: 'Food & Beverage', icon: '🍽' },
  { id: 'government', label: 'Government & Politics', icon: '🏛' },
  { id: 'health', label: 'Health & Wellness', icon: '❤️' },
  { id: 'nonprofit', label: 'Non-Profit', icon: '🤝' },
  { id: 'other', label: 'Other', icon: '💝' },
  { id: 'tech', label: 'Tech', icon: '💻' },
  { id: 'travel', label: 'Travel & Tourism', icon: '✈️' }
];

const OnboardingForm = () => {
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { username, selectedCategory });
  };

  return (
    <div className={styles.container}>
     
        
      <div className={styles.formSection}>
      <div className={styles.logo}>
          <img src={spark} alt="Spark" className={styles.logoImg} />
          <span className={styles.sparkText}>SPARK</span>
        </div>
        <div className={styles.formGroup}>
        <div className={styles.formContent}>
          <h1>Tell us about yourself</h1>
          <p className={styles.subtitle}>For a personalized Spark experience</p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tell us your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
            
            <div className={styles.categorySection}>
              <p className={styles.categoryLabel}>
                Select one category that best describes your Linktree:
              </p>
              <div className={styles.categoryGrid}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`${styles.categoryButton} ${
                      selectedCategory === category.id ? styles.selected : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button type="submit" className={styles.continueButton}>
              Continue
            </button>
          </form>
        </div>
        </div>
      </div>
      
      <div className={styles.imageSection}>
        <img 
          src={image}
          alt="Decorative"
          className={styles.decorativeImage}
        />
      </div>
    </div>
  );
};

export default OnboardingForm;