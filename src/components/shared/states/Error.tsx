import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/animations/Error.json';

interface ErrorProps {
  width?: number;
  height?: number;
  message?: string;
}

const Error = ({ width = 120, height = 120, message }: ErrorProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
        gap: 16,
      }}
    >
      <Lottie animationData={loadingAnimation} loop autoplay style={{ width, height }} />
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default Error;
