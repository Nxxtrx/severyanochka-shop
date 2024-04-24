import React from 'react';
import type { FC } from 'react';
import { CircularProgress } from '@mui/material';
import './Preloader.scss';

const Preloader: FC = () => {
  return (
    <div className="preloader">
      <CircularProgress color="success" />
    </div>
  );
};

export default Preloader;
