import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import LOGO from './logo.png';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt
        className='Tilt br2 shadow-2'
        options={{ max: 50 }}
        style={{ height: 200, width: 200 }}
      >
        <div className='Tilt-inner'>
          <img
            alt='logo'
            src={LOGO}
            style={{ height: '150px', width: '150px', paddingTop: '25px' }}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
