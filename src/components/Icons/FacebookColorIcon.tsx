import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const FacebookColorSvg = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M27.3406 1.13281H2.66328C1.81803 1.13281 1.13281 1.81803 1.13281 2.66328V27.3406C1.13281 28.1859 1.81803 28.8711 2.66328 28.8711H27.3406C28.1859 28.8711 28.8711 28.1859 28.8711 27.3406V2.66328C28.8711 1.81803 28.1859 1.13281 27.3406 1.13281Z"
      fill="#3D5A98"
    />
    <path
      d="M20.268 28.8684V18.127H23.8727L24.4117 13.941H20.268V11.2692C20.268 10.0574 20.6055 9.2301 22.3422 9.2301H24.5594V5.4801C23.4857 5.36821 22.4068 5.31501 21.3273 5.32073C18.1352 5.32073 15.9367 7.26604 15.9367 10.8543V13.941H12.332V18.127H15.9367V28.8684H20.268Z"
      fill="white"
    />
  </svg>
);

const FacebookColorIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={FacebookColorSvg} {...props} />
);

export default FacebookColorIcon;
