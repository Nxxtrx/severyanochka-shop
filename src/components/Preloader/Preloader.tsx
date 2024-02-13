import { CircularProgress } from '@mui/material'
import React from 'react'
import './Preloader.scss'

const Preloader = () => {
  return (
    <div className='preloader'>
      <CircularProgress color='success' />
    </div>
  )
}

export default Preloader