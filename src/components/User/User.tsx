import React from 'react';
import avatarImage from '../../images/header-avatar.png';
import userSettingImage from '../../images/user-setting.svg';

const User: React.FC = () => {
  return (
    <div className="user">
      <img className="user__image" src={avatarImage} alt="" />
      <p className="user__name">Алексей</p>
      <button className="user__button">
        <img src={userSettingImage} alt="" />
      </button>
    </div>
  );
};

export default User;
