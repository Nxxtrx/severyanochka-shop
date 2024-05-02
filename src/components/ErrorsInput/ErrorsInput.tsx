import React, { FC } from 'react';
import alertIcon from '../../images/input-alert.svg';
import './ErrorsInput.scss';

interface ErrorsInputProps {
  errorText: string;
}

const ErrorsInput: FC<ErrorsInputProps> = ({ errorText }) => {
  return (
    <div className="error">
      <img src={alertIcon} alt="" />
      <p className="error__text">{errorText.split('.')[0]}</p>
    </div>
  );
};

export default ErrorsInput;
