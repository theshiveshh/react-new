import React from 'react';
import Particles from 'react-particles-js';

const ParticleBackground = () => {
  const particleParams = {
    particles: {
      number: {
        value: 50, 
      },
      size: {
        value: 3, 
      },
    },
  };

  return (
    <Particles
      params={particleParams}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default ParticleBackground;