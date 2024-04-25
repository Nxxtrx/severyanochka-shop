import React, { useEffect, useState } from 'react';
import avatarImage from '../../images/user-avatar.svg';
import userSettingImage from '../../images/user-setting.svg';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './User.scss';

interface IUser {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
}

const User: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = (): void => {
    auth.onAuthStateChanged(user => {
      if (user != null) {
        const docRef = doc(db, 'Users', user.uid);
        getDoc(docRef)
          .then(docSnap => {
            if (docSnap.exists()) {
              const userData = docSnap.data() as IUser;
              setUser(userData);
            } else {
              console.log('ошибка');
            }
          })
          .catch(error => {
            console.error('Ошибка при получении данных:', error);
          });
      }
    });
  };

  const toggleDropdown = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const signOutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = (): void => {
    void signOutUser();
  };

  return (
    <div className={`user ${isDropdownOpen && 'user_type_active'}`}>
      <img className="user__image" src={avatarImage} alt="" />
      {user != null ? (
        <p className="user__name">{user.firstName}</p>
      ) : (
        <button
          onClick={() => {
            navigate('login');
          }}
          className="user__signing-btn">
          Войти
        </button>
      )}
      {user != null && (
        <button onClick={toggleDropdown} className="user__button">
          <img src={userSettingImage} alt="" />
        </button>
      )}
      {isDropdownOpen && (
        <div className="user__setting user__setting_type_active">
          <button className="user__sign-out">Профиль</button>
          <button type="button" onClick={handleSignOut} className="user__sign-out">
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
