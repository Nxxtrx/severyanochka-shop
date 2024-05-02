import React, { useEffect, useRef, useState } from 'react';
import signInImage from '../../images/auth-log-in.svg';
import avatarImage from '../../images/user-avatar.svg';
import userSettingImage from '../../images/user-setting.svg';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './User.scss';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface IUser {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
}

const User: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
              if (userData.avatarUrl != null) {
                setSelectedImage(userData.avatarUrl);
              }
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
    setUser(null);
    toggleDropdown();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file != null) {
      const imageRef = ref(storage, `images/${file.name}`);
      void uploadBytes(imageRef, file)
        .then(() => {
          void getDownloadURL(ref(storage, `images/${file.name}`)).then(url => {
            if (auth.currentUser != null) {
              void updateDoc(doc(db, 'Users', auth.currentUser?.uid), {
                avatarUrl: url,
              });
            }
            setSelectedImage(url);
            console.log(url);
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleImageClick = (): void => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`user ${isDropdownOpen && 'user_type_active'}`}>
      {user != null ? (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <img
            className="user__image"
            src={selectedImage ?? avatarImage}
            alt=""
            onClick={handleImageClick}
          />
          <p className="user__name">{user.firstName}</p>
        </>
      ) : (
        <button
          onClick={() => {
            navigate('login');
          }}
          className="user__signing-btn">
          Войти
          <img src={signInImage} alt="" />
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
