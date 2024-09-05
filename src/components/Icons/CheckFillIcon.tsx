import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CheckFillSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M40 70C56.5685 70 70 56.5685 70 40C70 23.4315 56.5685 10 40 10C23.4315 10 10 23.4315 10 40C10 56.5685 23.4315 70 40 70ZM37.4349 50.6402L54.1016 30.6402L52.5651 29.3598L36.5995 48.5186L27.3738 39.2929L25.9596 40.7071L35.9596 50.7071L36.7339 51.4814L37.4349 50.6402Z"
      fill="#52C73F"
    />
  </svg>
);

const CheckFillIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CheckFillSvg} {...props} />
);

export default CheckFillIcon;
