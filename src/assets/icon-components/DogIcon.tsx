import React from 'react';
import { cn } from '@/lib/utils';

export interface DogIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
  iconColor?: string;
}

export const DogIcon = React.forwardRef<SVGSVGElement, DogIconProps>(
  ({ size = 24, className, iconColor = '#020409', ...props }, ref) => {
    // iconColor should be white when selected, black when unselected
    const mainFill = iconColor;
    const strokeColor = iconColor;

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.00001 14.5561C3.9993 13.7677 4.10937 12.6089 4.27269 11.6154C4.4086 11.5697 4.54589 11.5193 4.68455 11.4638C6.0065 10.9351 7.05638 10.146 7.77244 9.49509C8.13154 9.16863 8.40983 8.87366 8.59959 8.65915C8.69455 8.5518 8.76824 8.46414 8.81834 8.40231C8.8432 8.37163 8.86249 8.34733 8.87596 8.33005L8.89158 8.30954L8.89939 8.29977C9.0648 8.07888 9.01962 7.76519 8.79881 7.59958C8.57817 7.43436 8.26535 7.47905 8.09959 7.69919L8.08689 7.71579C8.0772 7.72823 8.06169 7.74787 8.041 7.77341C7.99931 7.82484 7.93606 7.9015 7.85154 7.99704C7.68198 8.18871 7.42877 8.45647 7.10057 8.75485C6.44164 9.35388 5.49133 10.065 4.31346 10.5361C3.94994 10.6815 3.60126 10.7871 3.26319 10.863C2.81292 10.6124 2.53098 10.2809 2.499 9.99997C2.386 9.00597 3.676 3.46997 6.499 2.99997C8.422 2.67897 10.15 3.84497 10.15 5.23497C11.4148 4.91375 12.7415 4.92822 13.999 5.27697C13.999 3.88697 15.843 2.67897 17.766 2.99997C20.589 3.46997 21.879 9.00597 21.766 9.99997C21.7336 10.2848 21.4442 10.6216 20.9829 10.8734C20.6301 10.7968 20.266 10.6883 19.8855 10.5361C18.7077 10.065 17.7574 9.35391 17.0984 8.75488C16.7702 8.4565 16.517 8.18875 16.3475 7.99707C16.2629 7.90153 16.1997 7.82487 16.158 7.77344C16.1373 7.7479 16.1218 7.72826 16.1121 7.71582L16.0994 7.69922C15.9337 7.47908 15.6208 7.4344 15.4002 7.59961C15.1794 7.76522 15.1342 8.07891 15.2996 8.2998L15.3074 8.30957L15.323 8.33008C15.3365 8.34737 15.3558 8.37166 15.3807 8.40234C15.4308 8.46417 15.5045 8.55184 15.5994 8.65918C15.7892 8.87369 16.0675 9.16866 16.4266 9.49512C17.1426 10.146 18.1925 10.9351 19.5145 11.4639C19.588 11.4933 19.6612 11.5213 19.734 11.5479C19.9054 12.5536 19.9964 13.7475 20 14.5561C20 18.7281 16.418 21.0001 12 21.0001C7.58201 21.0001 4.00001 18.7281 4.00001 14.5561Z"
          fill={mainFill}
        />
        <path
          d="M11.25 16.25H12.75L12 17L11.25 16.25Z"
          stroke={iconColor === '#FFFFFF' ? '#020409' : '#FFFFFF'}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 14V14.5"
          stroke={iconColor === '#FFFFFF' ? '#020409' : '#FFFFFF'}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 14V14.5"
          stroke={iconColor === '#FFFFFF' ? '#020409' : '#FFFFFF'}
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.88642 8.31506C8.88325 8.31927 8.87944 8.32432 8.875 8.33002L8.88642 8.31506Z"
          fill={iconColor === '#FFFFFF' ? '#FFFFFF' : '#2C2C2C'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.3128 8.31506L15.3242 8.33002C15.3198 8.32432 15.316 8.31927 15.3128 8.31506Z"
          fill={iconColor === '#FFFFFF' ? '#FFFFFF' : '#2C2C2C'}
        />
      </svg>
    );
  }
);

DogIcon.displayName = 'DogIcon';
