import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import LOGO from './logo.png';

const Logo = () => {
  return (
    <div className='ma5 mt0'>
      <Tilt
        className='Tilt br2 shadow-2'
        options={{ max: 50 }}
        style={{ height: 150, width: 150 }}
      >
        <div className='Tilt-inner'>
          <img
            alt='logo'
            src={LOGO}
            style={{ height: '100px', width: '100px', paddingTop: '25px' }}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
