import React, { FC } from 'react';

interface AuthContainerProps {
  children?: React.ReactNode;
}

const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  return (
    <section className="auth-container">
      <h2 className="auth-container__title">Регистрация</h2>
      <form className="auth-container__form">
        {children}
        <button type="submit" className="auth-container__btn-submit">
          Зарегистрироваться
        </button>
      </form>
    </section>
  );
};

export default AuthContainer;
