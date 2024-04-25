import React, { FC, FormEvent, useState } from 'react';
import showPasswordIcon from '../../images/auth-show-password.svg';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  repeatPassword: string;
}

const Registration: FC = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    repeatPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = (inputNumber: number): void => {
    if (inputNumber === 1) {
      setShowPassword(!showPassword);
    } else {
      setShowRepeatPassword(!showRepeatPassword);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void (async () => {
      try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
        if (auth.currentUser != null) {
          await setDoc(doc(db, 'Users', auth.currentUser.uid), {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <form className="auth auth__form" onSubmit={handleSubmit}>
      <label className="auth__label">
        Телефон
        <input
          className="auth__input"
          type="number"
          onChange={e => {
            setUser({ ...user, phone: e.target.value });
          }}
        />
      </label>
      <label className="auth__label">
        Фамилия
        <input
          className="auth__input"
          type="text"
          onChange={e => {
            setUser({ ...user, lastName: e.target.value });
          }}
        />
      </label>
      <label className="auth__label">
        Имя
        <input
          className="auth__input"
          type="text"
          onChange={e => {
            setUser({ ...user, firstName: e.target.value });
          }}
        />
      </label>
      <label className="auth__label">
        E-mail
        <input
          className="auth__input"
          type="email"
          onChange={e => {
            setUser({ ...user, email: e.target.value });
          }}
        />
      </label>
      <label className="auth__label">
        Пароль
        <input
          className="auth__input"
          type={`${showPassword ? 'text' : 'password'}`}
          onChange={e => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <button
          type="button"
          className="auth__show-password-btn"
          onClick={() => {
            togglePasswordVisibility(1);
          }}>
          <img src={showPasswordIcon} alt="" />
        </button>
      </label>
      <label className="auth__label">
        Повторите пароль
        <input
          className="auth__input"
          type={`${showRepeatPassword ? 'text' : 'password'}`}
          onChange={e => {
            setUser({ ...user, repeatPassword: e.target.value });
          }}
        />
        <button
          type="button"
          className="auth__show-password-btn"
          onClick={() => {
            togglePasswordVisibility(2);
          }}>
          <img src={showPasswordIcon} alt="" />
        </button>
      </label>
      <button type="submit" className="auth-container__btn-submit">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default Registration;
