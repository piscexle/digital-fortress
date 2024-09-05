import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CloseSvg = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M16.4829 3.51659C15.4169 2.45105 14.1045 1.66482 12.6621 1.22753C11.2197 0.790236 9.6917 0.715367 8.21344 1.00955C6.73518 1.30374 5.35227 1.95791 4.18718 2.91412C3.02208 3.87033 2.11075 5.09909 1.53388 6.49158C0.957015 7.88406 0.732416 9.39731 0.879973 10.8973C1.02753 12.3973 1.54269 13.8378 2.37983 15.0912C3.21698 16.3446 4.35027 17.3722 5.67936 18.0831C7.00845 18.7939 8.49232 19.1661 9.99956 19.1666C12.4298 19.1696 14.7618 18.2074 16.4829 16.4916C17.3358 15.6402 18.0125 14.6289 18.4741 13.5157C18.9358 12.4025 19.1734 11.2092 19.1734 10.0041C19.1734 8.79895 18.9358 7.60564 18.4741 6.49244C18.0125 5.37924 17.3358 4.368 16.4829 3.51659ZM13.5329 12.3583C13.6881 12.5144 13.7752 12.7256 13.7752 12.9458C13.7752 13.1659 13.6881 13.3771 13.5329 13.5333C13.3768 13.6885 13.1656 13.7756 12.9454 13.7756C12.7252 13.7756 12.514 13.6885 12.3579 13.5333L9.99956 11.1749L7.64123 13.5333C7.48509 13.6885 7.27388 13.7756 7.05373 13.7756C6.83357 13.7756 6.62236 13.6885 6.46623 13.5333C6.31102 13.3771 6.2239 13.1659 6.2239 12.9458C6.2239 12.7256 6.31102 12.5144 6.46623 12.3583L8.82456 9.99992L6.46623 7.64159C6.32971 7.48217 6.25837 7.2771 6.26647 7.06737C6.27457 6.85764 6.36151 6.65869 6.50993 6.51028C6.65834 6.36187 6.85729 6.27493 7.06702 6.26683C7.27675 6.25872 7.48181 6.33006 7.64123 6.46659L9.99956 8.82492L12.3579 6.46659C12.4326 6.37935 12.5245 6.3085 12.6279 6.25848C12.7313 6.20846 12.8439 6.18035 12.9587 6.17592C13.0735 6.17149 13.1879 6.19082 13.2948 6.23272C13.4018 6.27462 13.4989 6.33816 13.5801 6.41938C13.6613 6.50059 13.7249 6.59771 13.7668 6.70465C13.8087 6.81159 13.828 6.92603 13.8236 7.0408C13.8191 7.15556 13.791 7.26817 13.741 7.37156C13.691 7.47495 13.6201 7.56688 13.5329 7.64159L11.1746 9.99992L13.5329 12.3583Z" fill="#272727"/>
</svg>
  );

const CloseIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CloseSvg} {...props} />
);

export default CloseIcon;
