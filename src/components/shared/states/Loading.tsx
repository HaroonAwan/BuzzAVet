import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/animations/Loading.json';

const Loading = ({ width = 120, height = 120 }) => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}
    >
      <Lottie animationData={loadingAnimation} loop autoplay style={{ width, height }} />
    </div>
  );
};

export default Loading;
