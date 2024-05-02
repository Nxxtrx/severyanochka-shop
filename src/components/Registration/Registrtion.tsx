import React, { FC, FormEvent, useEffect, useState } from 'react';
import showPasswordIcon from '../../images/auth-show-password.svg';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useFormAndValidation } from '../../hooks/useValidation';
import ErrorsInput from '../ErrorsInput/ErrorsInput';
import InputMask from 'react-input-mask';

const Registration: FC = () => {
  const { values, errors, isValid, handleChange, setIsValid, resetForm } = useFormAndValidation();
  const { email, password, firstName, lastName, phone, repeatPassword } = values;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  useEffect(() => {
    setIsValid(false);
  }, []);

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
        await createUserWithEmailAndPassword(auth, email, password);
        if (auth.currentUser != null) {
          await setDoc(doc(db, 'Users', auth.currentUser.uid), {
            email: email,
            firstName: firstName,
            lastName: lastName ?? null,
            phone: phone ?? null,
            avatarUrl: null,
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
    resetForm();
  };

  return (
    <form className="auth auth__form" onSubmit={handleSubmit}>
      <label className="auth__label">
        Телефон
        <InputMask
          mask="+7 (999) 999-99-99"
          placeholder="+7 (___) ___-__-__"
          className="auth__input"
          type="phone"
          name="phone"
          value={phone !== '' ? phone : ''}
          onChange={handleChange}
        />
        {errors.phone !== undefined && errors.phone !== '' ? (
          <ErrorsInput errorText={errors.phone} />
        ) : (
          ''
        )}
      </label>
      <label className="auth__label">
        Фамилия
        <input
          className="auth__input"
          type="text"
          name="lastName"
          maxLength={32}
          value={lastName !== '' ? lastName : ''}
          onChange={handleChange}
        />
      </label>
      <label className="auth__label">
        Имя *
        <input
          className="auth__input"
          type="text"
          name="firstName"
          minLength={2}
          maxLength={32}
          value={firstName !== '' ? firstName : ''}
          onChange={handleChange}
          required
        />
        {errors.firstName !== undefined && errors.firstName !== '' ? (
          <ErrorsInput errorText={errors.firstName} />
        ) : (
          ''
        )}
      </label>
      <label className="auth__label">
        E-mail *
        <input
          className="auth__input"
          type="email"
          name="email"
          minLength={4}
          maxLength={52}
          value={email !== '' ? email : ''}
          onChange={handleChange}
          required
        />
        {errors.email !== undefined && errors.email !== '' ? (
          <ErrorsInput errorText={errors.email} />
        ) : (
          ''
        )}
      </label>
      <label className="auth__label">
        Пароль *
        <input
          className="auth__input"
          type={`${showPassword ? 'text' : 'password'}`}
          name="password"
          minLength={6}
          maxLength={52}
          value={password !== '' ? password : ''}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="auth__show-password-btn"
          onClick={() => {
            togglePasswordVisibility(1);
          }}>
          <img src={showPasswordIcon} alt="" />
        </button>
        {errors.password !== undefined && errors.password !== '' ? (
          <ErrorsInput errorText={errors.password} />
        ) : (
          ''
        )}
      </label>
      <label className="auth__label">
        Повторите пароль *
        <input
          className="auth__input"
          type={`${showRepeatPassword ? 'text' : 'password'}`}
          name="repeatPassword"
          minLength={5}
          maxLength={52}
          value={repeatPassword !== '' ? repeatPassword : ''}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="auth__show-password-btn"
          onClick={() => {
            togglePasswordVisibility(2);
          }}>
          <img src={showPasswordIcon} alt="" />
        </button>
        {errors.repeatPassword !== undefined && errors.repeatPassword !== '' ? (
          <ErrorsInput errorText={errors.repeatPassword} />
        ) : (
          ''
        )}
      </label>
      <button
        type="submit"
        disabled={!isValid}
        className={`auth-container__btn-submit ${!isValid && 'auth-container__btn-submit_type_active'}`}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default Registration;
