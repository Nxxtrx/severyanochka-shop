import React, { FC, FormEvent, useState } from 'react';
import showPasswordIcon from '../../images/auth-show-password.svg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void (async () => {
      try {
        const login = await signInWithEmailAndPassword(auth, user.email, user.password);
        console.log(login);
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <form className="auth auth__form" onSubmit={handleSubmit}>
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
            setShowPassword(!showPassword);
          }}>
          <img src={showPasswordIcon} alt="" />
        </button>
      </label>
      <button type="submit" className="auth-container__btn-submit">
        Вход
      </button>
    </form>
  );
};

export default Login;
