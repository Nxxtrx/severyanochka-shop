import React, { FC, FormEvent, useEffect, useState } from 'react';
import showPasswordIcon from '../../images/auth-show-password.svg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useValidation';
import ErrorsInput from '../ErrorsInput/ErrorsInput';

const Login: FC = () => {
  const { values, errors, isValid, handleChange, setIsValid, resetForm } = useFormAndValidation();
  const { email, password } = values;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsValid(false);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void (async () => {
      try {
        const login = await signInWithEmailAndPassword(auth, email, password);
        console.log(login);
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    })();
    resetForm();
  };

  return (
    <form className="auth auth__form" onSubmit={handleSubmit}>
      <label className="auth__label">
        E-mail
        <input
          className="auth__input"
          type="email"
          name="email"
          minLength={6}
          maxLength={120}
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
        Пароль
        <input
          className="auth__input"
          type={`${showPassword ? 'text' : 'password'}`}
          name="password"
          minLength={6}
          maxLength={30}
          value={password !== '' ? password : ''}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="auth__show-password-btn"
          onClick={() => {
            setShowPassword(!showPassword);
          }}>
          <img src={showPasswordIcon} alt="" />
        </button>
        {errors.password !== undefined && errors.password !== '' ? (
          <ErrorsInput errorText={errors.password} />
        ) : (
          ''
        )}
      </label>
      <button
        type="submit"
        disabled={!isValid}
        className={`auth-container__btn-submit ${!isValid && 'auth-container__btn-submit_type_active'}`}>
        Вход
      </button>
    </form>
  );
};

export default Login;
