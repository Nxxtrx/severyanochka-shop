import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AuthContainer.scss';

interface AuthContainerProps {
  children?: React.ReactNode;
  title: string;
}

const AuthContainer: FC<AuthContainerProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const toggleButton = (): React.JSX.Element => {
    if (location.pathname === '/login') {
      return (
        <button
          className="auth-container__toggle-btn"
          onClick={() => {
            navigate('/registration');
          }}>
          Регистрация
        </button>
      );
    } else {
      return (
        <button
          className="auth-container__toggle-btn"
          onClick={() => {
            navigate('/login');
          }}>
          Вход
        </button>
      );
    }
  };

  return (
    <section className="auth-container">
      <div className="auth-container__overlay">
        <h2 className="auth-container__title">{title}</h2>
        {children}
        {toggleButton()}
      </div>
    </section>
  );
};

export default AuthContainer;
