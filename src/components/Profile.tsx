import React, { useState, useEffect } from 'react';

import WindowFrame from './WindowFrame';

import './Profile.css';

interface ProfileData {
  name: string;
  surname: string;
  email: string;
  linkedin?: string;
  coreSkills: string[];
  additionalSkills: string[];
}

interface ProfileProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ 
  onClose, 
  onMinimize, 
  onMaximize, 
  isMaximized 
}) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const response = await fetch('/profile-data.json');
        if (!response.ok) {
          throw new Error('Failed to load profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError('Could not load profile information');
        console.error('Error loading profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  if (loading) {
    return (
      <WindowFrame
        title="Profile"
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        isMaximized={isMaximized}
        width={500}
        height={600}
      >
        <div className="profile-window">
          <div className="profile-loading">Loading profile...</div>
        </div>
      </WindowFrame>
    );
  }

  if (error || !profileData) {
    return (
      <WindowFrame
        title="Profile"
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        isMaximized={isMaximized}
        width={500}
        height={500}
      >
        <div className="profile-window">
          <div className="profile-error">
            {error || 'Profile data not available'}
          </div>
        </div>
      </WindowFrame>
    );
  }

  return (
    <WindowFrame
      title="Profile"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      width={500}
      height={500}
    >
      <div className="profile-window">
        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src="/profile-image.jpg" 
              alt="Profile Avatar" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="avatar-fallback hidden">
              <div className="avatar-initials">
                {profileData.name.charAt(0)}{profileData.surname.charAt(0)}
              </div>
            </div>
          </div>
          <div className="profile-basic-info">
            <h1 className="profile-name">
              {profileData.name} {profileData.surname}
            </h1>
            <div className="profile-contact">
              <p className="profile-email">
                <span className="contact-icon">📫</span>
                {profileData.email}
              </p>
              {profileData.linkedin && (
                <p className="profile-linkedin">
                  <span className="contact-icon">💼</span>
                  <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                    LinkedIn
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2 className="section-title">Skills</h2>
            
            <div className="skills-subsection">
              <h3 className="skills-subsection-title">Core</h3>
              <div className="tags-container">
                {profileData.coreSkills.map((skill, index) => (
                  <span key={`core-${index}`} className="tag skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="skills-subsection">
              <h3 className="skills-subsection-title">Additional</h3>
              <div className="tags-container">
                {profileData.additionalSkills.map((skill, index) => (
                  <span key={`additional-${index}`} className="tag additional-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default Profile;