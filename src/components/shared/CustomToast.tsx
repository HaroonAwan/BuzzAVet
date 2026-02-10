import { toast } from 'react-hot-toast';
import LogoIcon from '@/assets/images/logo/mini-logo.svg';
import { StaticImageData } from 'next/image';
import { Button } from './Button';

interface CustomToastProps {
  icon?: string | StaticImageData;
  title?: string;
  message: string;
  onClick?: () => void;
  buttonTitle?: string;
}

const CustomToast = ({ icon, title, message, onClick, buttonTitle }: CustomToastProps) => {
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
      } max-w-md w-full bg-white rounded-lg pointer-events-auto flex SHADOW`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={typeof icon === 'string' ? icon : LogoIcon.src}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            {title && <p className="text-sm font-medium text-gray-900">{title}</p>}
            <p className="mt-1 text-sm">{message}</p>
          </div>
        </div>
      </div>
      {onClick && buttonTitle && (
        <div className="flex border-l border-gray-200">
          <Button
            variant="ghost"
            onClick={() => {
              toast.dismiss(t.id);
              onClick && onClick();
            }}
          >
            {buttonTitle}
          </Button>
        </div>
      )}
    </div>
  ));
};

export default CustomToast;
