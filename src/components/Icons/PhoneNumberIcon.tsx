import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const PhoneNumberSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M7.77194 2.43881L8.84894 2.09481C9.85694 1.77281 10.9349 2.29381 11.3669 3.31181L12.2269 5.33981C12.6019 6.22281 12.3939 7.26181 11.7129 7.90781L9.81994 9.70581C9.93694 10.7818 10.2979 11.8408 10.9039 12.8828C11.4798 13.891 12.252 14.7734 13.1749 15.4778L15.4509 14.7178C16.3129 14.4308 17.2519 14.7618 17.7809 15.5388L19.0129 17.3488C19.6289 18.2528 19.5179 19.4988 18.7549 20.2648L17.9369 21.0858C17.1229 21.9028 15.9609 22.1998 14.8849 21.8638C12.3459 21.0718 10.0119 18.7208 7.88194 14.8108C5.74894 10.8948 4.99694 7.57081 5.62394 4.84281C5.88794 3.69481 6.70594 2.77981 7.77394 2.43881"
      fill="white"
    />
  </svg>
);

const PhoneNumberIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PhoneNumberSvg} {...props} />
);

export default PhoneNumberIcon;
