'use client';

import { Button, Space } from 'antd';
import React from 'react';
import './ring.scss';
import './style.scss';
import PhoneNumberIcon from '../Icons/PhoneNumberIcon';
import ZaloIcon from '../Icons/ZaloIcon';
import FacebookColorIcon from '../Icons/FacebookColorIcon';

const BubbleIcon = () => {
  // const [isCheckedContact, setIsCheckedContact] = useState<boolean>(false);
  const getBusinessInfo = {
    data: {
      logo: '/images/icon-auth.png',
      address: '123, Lô 1, Đư��ng Hai Bà Trưng, Quận 1, TP HCM',
      hotline: '(+84) 96 123 4567',
      email: 'info@digital-fortress.com',
      zalo: 'digital-fortress.com',
      tiktok: 'digital-fortress.com',
      facebook: 'digital-fortress.com',
    },
  };

  const navigateToFanpage = () => {
    const fanPageUrl = `${getBusinessInfo.data?.facebook}`;
    window.open(fanPageUrl, '_blank');
  };

  const navigateToPhone = () => {
    const phone = `${getBusinessInfo.data?.hotline}`;
    window.open(`tel: ${phone?.replaceAll(' ', '')}`, '_blank');
  };

  const navigateToZalo = () => {
    const zaloLink = `${getBusinessInfo.data?.zalo}`;
    window.open(`https://zalo.me/${zaloLink?.replaceAll(' ', '')}`, '_blank');
  };

  return (
    <div className="bubble-icon">
      {/* <div className="wrapper-ring">
        <div className="container-ring">
          {isCheckedContact ? (
            <div style={{ position: 'fixed', bottom: '180px', right: '24px' }}>
              <Button
                onClick={() => {
                  setIsCheckedContact(!isCheckedContact);
                }}
                icon={<CloseOutlined />}
                type="primary"
                size="large"
                style={{ borderRadius: '50%' }}
              />
            </div>
          ) : (
            <div className="coccoc-alo-phone coccoc-alo-green">
              <div className="coccoc-alo-ph-circle-fill" />
              <div
                onClick={() => {
                  setIsCheckedContact(!isCheckedContact);
                }}
                className="coccoc-alo-ph-img-circle"
                aria-hidden
              />
            </div>
          )}
        </div>
      </div> */}
      {/* {isCheckedContact && ( */}
      <div className="wrapper-action-contact">
        <Space direction="vertical">
          <Button icon={<PhoneNumberIcon />} className="btn-icon-phone" onClick={navigateToPhone} />

          <Button className="btn-icon-zalo" icon={<ZaloIcon />} onClick={navigateToZalo} />
          <Button
            className="btn-icon-facebook"
            icon={<FacebookColorIcon />}
            onClick={navigateToFanpage}
          />
        </Space>
      </div>
      {/* )} */}
    </div>
  );
};

export default BubbleIcon;
